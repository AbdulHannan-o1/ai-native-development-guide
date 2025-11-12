---
name: python-sandbox
description: |
  Validate Python code blocks from markdown chapters in isolated Docker container with Python 3.14 and UV package manager.
  Persistent container setup - installs once, reuses for all validations.
  Use when auditing Python chapters, validating code examples, or ensuring syntax correctness before publication.
allowed-tools: ["Bash", "Read", "Write", "Grep"]
metadata:
  category: "validation"
  version: "1.0.0"
  python_version: "3.14.0"
  container_name: "python-sandbox-validator"
---

# Python Sandbox — Persistent Docker Validation Environment

## Overview

Validates Python code blocks from markdown chapters using a persistent Docker container with Python 3.14 and UV package manager. Sets up once, reuses for all validations - no rebuild overhead.

**Key Features:**
- ✅ Persistent container (setup once, use many times)
- ✅ Python 3.14.0 stable + UV package manager
- ✅ Automatic code extraction from markdown
- ✅ Syntax validation (AST) + Runtime validation (execution)
- ✅ Detailed error reporting with file locations
- ✅ Smart handling of demo snippets and timeouts

## When to Use

Use this skill when:
- ✅ Auditing Python Fundamentals chapters (Part 4, Chapters 12-29)
- ✅ Validating code examples before publication
- ✅ Ensuring syntax correctness in Python 3.14
- ✅ Need reproducible, isolated validation environment
- ✅ Want fast validation without rebuilding containers

**Trigger phrases:**
- "Validate Python code in Chapter X"
- "Check if code blocks run correctly"
- "Audit Python examples for errors"
- "Test Chapter X code in sandbox"
- "Run Python validation on [chapter-path]"

## Quick Start

### Step 1: Validate a Chapter

Simply provide the chapter path:

```
User: "Validate Python code in book-source/docs/04-Python-Fundamentals/14-data-types"
```

The skill will:
1. Check if sandbox container exists
2. If not, create and setup (Python 3.14 + UV) - takes ~2 minutes first time
3. Extract all Python code blocks from chapter
4. Validate syntax and runtime
5. Generate detailed report

### Step 2: Review Results

The skill outputs:
- **Summary**: Total blocks, errors, success rate
- **Per-file errors**: Exact file and line numbers
- **Detailed report**: Saved to `validation-output/`

### Step 3: Fix and Re-validate

After fixing errors, simply re-run:
```
User: "Re-validate Chapter 14"
```

Container is already setup - validation runs instantly!

## Workflow

### Container Lifecycle

**First run (setup):**
```bash
# Creates persistent container named "python-sandbox-validator"
scripts/setup-sandbox.sh
```

This installs:
- Python 3.14.0 (stable)
- UV package manager (latest)
- Common dependencies (pytest, typing-extensions)

**Subsequent runs (validation):**
```bash
# Reuses existing container - no rebuild
scripts/validate-in-sandbox.sh <chapter-path>
```

**Reset container:**
```bash
# Remove and recreate if issues occur
scripts/reset-sandbox.sh
```

### Validation Process

1. **Extract code blocks** - Parse markdown, find all ```python blocks
2. **Syntax check** - AST parsing catches syntax errors
3. **Runtime check** - Execute in subprocess, capture errors
4. **Generate report** - Markdown format with actionable fixes

## Bundled Scripts

### scripts/setup-sandbox.sh

Creates persistent Docker container with Python 3.14 + UV.

**Usage:**
```bash
bash scripts/setup-sandbox.sh
```

**What it does:**
- Checks if container "python-sandbox-validator" exists
- If exists, confirms it's running
- If not, creates new container from python:3.14-slim
- Installs UV package manager
- Installs common dependencies
- Keeps container running in background

**Output:** Container ID and status

---

### scripts/validate-in-sandbox.sh

Main validation script - runs in persistent container.

**Usage:**
```bash
bash scripts/validate-in-sandbox.sh <chapter-path> [output-dir]
```

**Arguments:**
- `chapter-path` - Path to chapter directory (e.g., `book-source/docs/04-Python-Fundamentals/14-data-types`)
- `output-dir` - Optional output directory (default: `validation-output`)

**Exit codes:**
- `0` - All code validated successfully
- `1` - Errors found (see report)
- `2` - Container not found (run setup first)
- `3` - Invalid arguments

**Output:**
- Terminal: Summary statistics
- File: `validation-output/<chapter-name>-report.md`

**Example:**
```bash
bash scripts/validate-in-sandbox.sh \
  book-source/docs/04-Python-Fundamentals/14-data-types \
  audit-results
```

---

### scripts/reset-sandbox.sh

Removes existing container and recreates fresh environment.

**Usage:**
```bash
bash scripts/reset-sandbox.sh
```

**When to use:**
- Container is corrupted
- Need to update Python version
- Want clean slate for testing

---

### scripts/extract_and_validate.py

Python script that runs INSIDE the container.

**What it does:**
- Extracts Python code blocks from markdown files
- Validates syntax using AST parsing
- Executes code in subprocess with timeout
- Generates detailed error reports
- Handles demo snippets (marked with `# DEMO:`)

**Not called directly** - executed by `validate-in-sandbox.sh`

## Instructions

When user requests validation, follow these steps:

### 1. Ensure Sandbox Exists

Check if persistent container is running:

```bash
docker ps | grep python-sandbox-validator
```

**If not found:**
```bash
bash .claude/skills/python-sandbox/scripts/setup-sandbox.sh
```

Output: "✅ Sandbox ready: python-sandbox-validator (container_id)"

### 2. Run Validation

Execute validation script with chapter path:

```bash
bash .claude/skills/python-sandbox/scripts/validate-in-sandbox.sh \
  book-source/docs/04-Python-Fundamentals/<chapter-directory>
```

**Example:**
```bash
bash .claude/skills/python-sandbox/scripts/validate-in-sandbox.sh \
  book-source/docs/04-Python-Fundamentals/14-data-types
```

### 3. Parse Results

The script outputs:

```
Python Sandbox Validation Report
================================
Chapter: 14-data-types
Total Code Blocks: 23
Syntax Errors: 1
Runtime Errors: 2
Success Rate: 87.0%

ERRORS FOUND:
  01-variables-and-type-hints.md:145 (block 7)
    - SYNTAX: invalid syntax (line 3)

  02-integers-and-floats.md:78 (block 3)
    - RUNTIME: ZeroDivisionError: division by zero

Detailed report: validation-output/14-data-types-report.md
```

### 4. Present Summary to User

Summarize key findings:

```markdown
## Validation Results: Chapter 14 (Data Types)

**Summary:**
- 📊 Total Code Blocks: 23
- ❌ Syntax Errors: 1
- ⚠️ Runtime Errors: 2
- ✅ Success Rate: 87.0%

**Errors Requiring Fix:**

1. **01-variables-and-type-hints.md:145**
   - Syntax error on line 3
   - Fix: Check for missing closing bracket/parenthesis

2. **02-integers-and-floats.md:78**
   - Runtime error: Division by zero
   - Fix: Add validation or use try/except

📄 Full report: `validation-output/14-data-types-report.md`
```

### 5. Offer Next Steps

```markdown
**Next Steps:**
1. Fix the 3 errors listed above
2. Re-run validation: "Re-validate Chapter 14"
3. Continue to next chapter once all pass

**Container status:** ✅ Ready for immediate re-validation (no setup needed)
```

## Common Scenarios

### Scenario 1: First-time validation

```
User: "Validate Chapter 14"

Assistant actions:
1. Check if sandbox exists (likely no)
2. Run setup-sandbox.sh (~2 min first time)
3. Run validate-in-sandbox.sh
4. Present summary + detailed report
```

### Scenario 2: Re-validation after fixes

```
User: "Re-validate Chapter 14"

Assistant actions:
1. Confirm sandbox exists (yes, persistent)
2. Run validate-in-sandbox.sh (instant, no setup)
3. Compare with previous results
4. Celebrate if all pass!
```

### Scenario 3: Validate multiple chapters

```
User: "Validate Chapters 14, 15, and 16"

Assistant actions:
1. Loop through each chapter
2. Run validate-in-sandbox.sh for each
3. Aggregate results into summary table
4. Highlight chapters needing attention
```

### Scenario 4: Container issues

```
User: "Validation failed with container error"

Assistant actions:
1. Run reset-sandbox.sh
2. Recreate container from scratch
3. Retry validation
4. Report if issue persists
```

## Report Format

The generated markdown report includes:

```markdown
# Python Code Validation Report - Chapter 14

**Generated:** 2025-01-12 15:30:45
**Python Version:** 3.14.0
**Container:** python-sandbox-validator

## Executive Summary

✅ SUCCESS - All code blocks validated

OR

❌ FAILURES DETECTED
- 1 syntax error(s) require immediate fix
- 2 runtime error(s) need review

## Results by File

### 01-variables-and-type-hints.md
- **Total Blocks:** 8
- **Errors:** 1
- **Status:** ❌ FAIL

**Error Details:**
- Line 145 (block 7) - SYNTAX: invalid syntax

[Code snippet with error highlighted]

### 02-integers-and-floats.md
- **Total Blocks:** 10
- **Errors:** 0
- **Status:** ✅ PASS

...

## Recommended Actions

### High Priority (Syntax Errors)
1. Fix 01-variables-and-type-hints.md:145

### Medium Priority (Runtime Errors)
2. Review 02-integers-and-floats.md:78
```

## Container Management

### Check Container Status

```bash
docker ps -f name=python-sandbox-validator
```

### View Container Logs

```bash
docker logs python-sandbox-validator
```

### Stop Container (but keep for reuse)

```bash
docker stop python-sandbox-validator
```

### Start Stopped Container

```bash
docker start python-sandbox-validator
```

### Remove and Recreate

```bash
bash scripts/reset-sandbox.sh
```

## Advanced Usage

### Validate with Custom Python Version

Edit `scripts/setup-sandbox.sh` and change:
```bash
PYTHON_VERSION="3.14"  # Change to 3.13, 3.15, etc.
```

Then reset:
```bash
bash scripts/reset-sandbox.sh
```

### Add Custom Dependencies

Execute in running container:
```bash
docker exec python-sandbox-validator uv pip install <package>
```

Or edit `scripts/setup-sandbox.sh` to include in initial setup.

### Batch Validation

Validate all Part 4 chapters:
```bash
for chapter in book-source/docs/04-Python-Fundamentals/*/; do
  bash scripts/validate-in-sandbox.sh "$chapter"
done
```

## Constitutional Alignment

This skill embodies:

✅ **Validation-First Safety (Philosophy #5)**: Never trust code without testing
✅ **Evals-First Development (Philosophy #4)**: Define success (0 errors) before validating
✅ **Professional Standards**: Production-grade Docker isolation
✅ **Efficiency**: Persistent container eliminates rebuild overhead

## Troubleshooting

### Issue: "Container not found"

**Solution:**
```bash
bash .claude/skills/python-sandbox/scripts/setup-sandbox.sh
```

### Issue: "Permission denied"

**Solution:**
```bash
# Make scripts executable
chmod +x .claude/skills/python-sandbox/scripts/*.sh
```

### Issue: "Python 3.14 image not found"

**Solution:**
```bash
# Pull latest Python 3.14 image
docker pull python:3.14-slim
```

Then reset sandbox:
```bash
bash .claude/skills/python-sandbox/scripts/reset-sandbox.sh
```

### Issue: "Many timeout errors"

**Solution:** Increase timeout in `scripts/extract_and_validate.py`:
```python
# Line ~120
proc = subprocess.run(..., timeout=10)  # Increase from 5
```

Then re-validate.

## Examples

### Example 1: Basic Validation

```
User: "Validate Chapter 14 Python code"

Assistant: "Setting up Python sandbox..."
[Runs setup-sandbox.sh]
"Validating Chapter 14..."
[Runs validate-in-sandbox.sh]

Summary:
- Total blocks: 23
- Errors: 0
- Success rate: 100%

✅ All code validated successfully\!
```

### Example 2: Errors Found

```
User: "Validate Chapter 17"

Assistant: [Validates and finds errors]

Results:
- Total blocks: 31
- Syntax errors: 2
- Runtime errors: 1

Fixes needed:
1. 03-loops.md:85 - Missing colon
2. 04-nested.md:120 - Undefined variable
3. 05-break-continue.md:45 - Division by zero
```

### Example 3: Batch Validation

```
User: "Validate all of Part 4"

Assistant: [Loops through chapters 12-29]

Results summary:
- Chapters validated: 18
- Total blocks: 387
- Errors: 12
- Success rate: 96.9%
```

## Status Output

Once skill execution completes, report:

```markdown
 STATUS=CREATED
 PATH=/Users/mjs/Documents/code/panaversity-official/tutorsgpt/part-2/.claude/skills/python-sandbox

 Created python-sandbox skill with:
 - SKILL.md (complete workflow guide)
 - scripts/setup-sandbox.sh (persistent container setup)
 - scripts/validate-in-sandbox.sh (validation orchestrator)
 - scripts/reset-sandbox.sh (container reset utility)
 - scripts/extract_and_validate.py (core validation logic)

 Next steps:
 1. Test: "Validate test-chapter/"
 2. Use: "Validate Chapter 14"
```
ENDOFEXAMPLES