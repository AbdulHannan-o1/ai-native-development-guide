#!/usr/bin/env python3
"""
Extract and validate Python code blocks from markdown files.
Runs inside Docker container.
"""

import ast
import re
import subprocess
import sys
import tempfile
from datetime import datetime
from pathlib import Path
from typing import TypedDict


class CodeBlock(TypedDict):
    """Metadata for extracted code block."""
    file: str
    block_index: int
    code: str
    line_start: int


class ValidationResult(TypedDict):
    """Result of validating a code block."""
    context: CodeBlock
    syntax_valid: bool
    runtime_valid: bool
    errors: list[dict]
    output: str


def extract_chapter_from_path(path: Path) -> str:
    """Extract chapter number from path."""
    name = path.name
    # Match patterns like "14-data-types"
    match = re.match(r'^(\d+)-', name)
    return match.group(1) if match else "unknown"


def is_demo_snippet(code: str) -> bool:
    """
    Check if code block is intentional demo (broken code for teaching).

    Markers:
    - # DEMO:
    - # EXAMPLE (syntax error)
    - # SNIPPET
    - # INTENTIONAL ERROR
    """
    markers = [
        '# DEMO:',
        '# EXAMPLE',
        '# SNIPPET',
        '# INTENTIONAL ERROR',
        '# TODO:',  # Incomplete code
    ]
    first_lines = code.strip().split('\n')[:3]  # Check first 3 lines
    return any(
        any(marker.lower() in line.lower() for marker in markers)
        for line in first_lines
    )


def extract_python_blocks(markdown_file: Path) -> list[CodeBlock]:
    """Extract all Python code blocks from markdown file."""
    try:
        content = markdown_file.read_text(encoding='utf-8')
    except Exception as e:
        print(f"Warning: Could not read {markdown_file}: {e}", file=sys.stderr)
        return []

    # Pattern: ```python ... ```
    pattern = r'```python\n(.*?)```'
    matches = re.finditer(pattern, content, re.DOTALL)

    blocks: list[CodeBlock] = []
    for idx, match in enumerate(matches):
        code = match.group(1).rstrip('\n')
        line_start = content[:match.start()].count('\n') + 1

        blocks.append({
            "file": markdown_file.name,
            "block_index": idx,
            "code": code,
            "line_start": line_start
        })

    return blocks


def validate_code_block(block: CodeBlock, timeout: int = 5) -> ValidationResult:
    """Validate syntax and runtime of code block."""
    result: ValidationResult = {
        "context": block,
        "syntax_valid": False,
        "runtime_valid": False,
        "errors": [],
        "output": ""
    }

    code = block["code"]

    # Skip demo snippets
    if is_demo_snippet(code):
        result["syntax_valid"] = True
        result["runtime_valid"] = True
        result["output"] = "[DEMO SNIPPET - SKIPPED]"
        return result

    # STEP 1: Syntax validation (AST)
    try:
        ast.parse(code)
        result["syntax_valid"] = True
    except SyntaxError as e:
        result["errors"].append({
            "type": "syntax",
            "message": str(e.msg) if hasattr(e, 'msg') else str(e),
            "line": e.lineno,
            "offset": e.offset,
            "text": e.text.strip() if e.text else ""
        })
        return result  # Don't run invalid syntax

    # STEP 2: Runtime validation (subprocess execution)
    with tempfile.NamedTemporaryFile(
        mode='w',
        suffix='.py',
        delete=False,
        encoding='utf-8'
    ) as f:
        f.write(code)
        temp_path = Path(f.name)

    try:
        proc = subprocess.run(
            ["python3", str(temp_path)],
            capture_output=True,
            timeout=timeout,
            text=True,
            cwd=temp_path.parent
        )

        result["output"] = proc.stdout

        if proc.returncode == 0:
            result["runtime_valid"] = True
        else:
            # Extract meaningful error
            stderr = proc.stderr.strip()
            error_lines = stderr.split('\n')
            # Get last line (usually the actual error)
            error_msg = error_lines[-1] if error_lines else "Unknown runtime error"

            result["errors"].append({
                "type": "runtime",
                "message": error_msg,
                "stderr": stderr,
                "returncode": proc.returncode
            })

    except subprocess.TimeoutExpired:
        result["errors"].append({
            "type": "timeout",
            "message": f"Execution exceeded {timeout} second timeout"
        })

    except Exception as e:
        result["errors"].append({
            "type": "unexpected",
            "message": str(e)
        })

    finally:
        temp_path.unlink(missing_ok=True)

    return result


def generate_report(results: list[ValidationResult], chapter_name: str) -> str:
    """Generate markdown validation report."""
    total_blocks = len(results)
    syntax_errors = sum(1 for r in results if not r["syntax_valid"])
    runtime_errors = sum(
        1 for r in results
        if r["syntax_valid"] and not r["runtime_valid"]
    )
    success_count = total_blocks - syntax_errors - runtime_errors
    success_rate = (success_count / total_blocks * 100) if total_blocks > 0 else 0

    # Group by file
    by_file: dict[str, list[ValidationResult]] = {}
    for result in results:
        file = result["context"]["file"]
        if file not in by_file:
            by_file[file] = []
        by_file[file].append(result)

    # Generate report
    report = f"""# Python Code Validation Report - {chapter_name}

**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**Python Version:** {sys.version.split()[0]}
**Container:** python-sandbox-validator

## Executive Summary

**Total Code Blocks:** {total_blocks}
**Syntax Errors:** {syntax_errors}
**Runtime Errors:** {runtime_errors}
**Successful:** {success_count}
**Success Rate:** {success_rate:.1f}%

"""

    if syntax_errors + runtime_errors == 0:
        report += "✅ **ALL CODE BLOCKS VALIDATED SUCCESSFULLY**\n\n"
        report += "All Python code examples passed both syntax and runtime validation.\n"
    else:
        report += f"❌ **VALIDATION FAILURES DETECTED**\n\n"
        report += f"- {syntax_errors} syntax error(s) require immediate fix\n"
        report += f"- {runtime_errors} runtime error(s) need review\n"

    report += "\n---\n\n## Results by File\n\n"

    for file, file_results in sorted(by_file.items()):
        total = len(file_results)
        errors = sum(1 for r in file_results if r["errors"])

        status = "✅ PASS" if errors == 0 else f"❌ FAIL ({errors} error(s))"

        report += f"### {file}\n"
        report += f"- **Total Blocks:** {total}\n"
        report += f"- **Errors:** {errors}\n"
        report += f"- **Status:** {status}\n\n"

        # List errors
        if errors > 0:
            report += "**Error Details:**\n\n"
            for result in file_results:
                if result["errors"]:
                    ctx = result["context"]
                    file_ref = f"`{ctx['file']}:{ctx['line_start']}`"

                    report += f"- {file_ref} (block {ctx['block_index']})\n"
                    for err in result["errors"]:
                        report += f"  - **{err['type'].upper()}**: {err['message']}\n"
                    report += "\n"

    report += "\n---\n\n## Recommended Actions\n\n"

    if syntax_errors > 0:
        report += "### High Priority (Syntax Errors)\n"
        report += "Fix these immediately—code will not run:\n\n"

        for result in results:
            if not result["syntax_valid"]:
                ctx = result["context"]
                for err in result["errors"]:
                    if err["type"] == "syntax":
                        report += f"- **{ctx['file']}:{ctx['line_start']}** — {err['message']}\n"
        report += "\n"

    if runtime_errors > 0:
        report += "### Medium Priority (Runtime Errors)\n"
        report += "Review these—syntax is valid but execution fails:\n\n"

        for result in results:
            if result["syntax_valid"] and not result["runtime_valid"]:
                ctx = result["context"]
                report += f"- **{ctx['file']}:{ctx['line_start']}** — Review runtime behavior\n"
        report += "\n"

    return report


def main():
    """Main validation orchestrator."""
    if len(sys.argv) < 4:
        print("Usage: extract_and_validate.py <chapter_dir> <output_dir> <chapter_name>")
        sys.exit(3)

    chapter_dir = Path(sys.argv[1])
    output_dir = Path(sys.argv[2])
    chapter_name = sys.argv[3]

    if not chapter_dir.exists():
        print(f"Error: Chapter directory not found: {chapter_dir}", file=sys.stderr)
        sys.exit(3)

    # Create output directory
    output_dir.mkdir(parents=True, exist_ok=True)

    # Find all markdown files
    markdown_files = list(chapter_dir.rglob("*.md"))

    if not markdown_files:
        print(f"Warning: No markdown files found in {chapter_dir}", file=sys.stderr)
        sys.exit(0)

    print(f"Found {len(markdown_files)} markdown file(s)")

    # Extract all code blocks
    all_blocks: list[CodeBlock] = []
    for md_file in markdown_files:
        blocks = extract_python_blocks(md_file)
        all_blocks.extend(blocks)

    if not all_blocks:
        print("No Python code blocks found")
        sys.exit(0)

    print(f"Extracted {len(all_blocks)} Python code block(s)")
    print("")

    # Validate each block
    results: list[ValidationResult] = []
    for i, block in enumerate(all_blocks, 1):
        print(f"Validating block {i}/{len(all_blocks)}...", end='\r')
        result = validate_code_block(block)
        results.append(result)

    print(f"\nValidation complete: {len(results)} blocks processed")

    # Generate report
    report = generate_report(results, chapter_name)

    # Save report
    report_file = output_dir / f"{chapter_name}-report.md"
    report_file.write_text(report, encoding='utf-8')

    print(f"Report saved: {report_file}")

    # Return exit code
    has_errors = any(r["errors"] for r in results)
    sys.exit(1 if has_errors else 0)


if __name__ == "__main__":
    main()
