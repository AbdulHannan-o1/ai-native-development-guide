---
title: "Complete Workflow Integration"
chapter: 12
lesson: 11
duration_minutes: 30

skills:
  - name: "Integrate Ruff + Pyright in Zed"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Digital Content Creation"
    measurable_at_this_level: "Student configures Zed LSP for both tools and sees diagnostics"

  - name: "Set Up Complete pyproject.toml"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Digital Content Creation"
    measurable_at_this_level: "Student adds sections for uv, Ruff, and Pyright in correct format"

  - name: "Understand Tool Workflow Sequence"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Analyze"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student explains when Ruff and Pyright run and in what order"

learning_objectives:
  - objective: "Create a new Python project with uv, Ruff, and Pyright fully integrated"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student creates project from scratch; all tools installed and configured"

  - objective: "Configure Zed to show both Ruff and Pyright diagnostics in real-time"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student edits Python file; sees both formatting errors and type errors inline"

  - objective: "Understand the workflow sequence: format → lint → type check → commit"
    proficiency_level: "B1"
    bloom_level: "Analyze"
    assessment_method: "Student explains what each tool does and why order matters"

cognitive_load:
  new_concepts: 7
  assessment: "7 concepts: workflow sequence, LSP with dual servers, tool responsibilities, configuration inheritance, error prioritization, pre-commit awareness, cross-platform consistency. Within B1 limit. ✓"

differentiation:
  extension_for_advanced: "Add pytest and pre-commit hooks; explore advanced LSP configuration"
  remedial_for_struggling: "Focus on: (1) create project, (2) install tools, (3) configure Zed, (4) verify all work"

generated_by: "lesson-writer v3.0.0"
source_spec: "specs/001-chapter-12-lightning-python-stack/plan.md"
created: "2025-01-15"
last_modified: "2025-01-15"
git_author: "Claude Code"
workflow: "/sp.implement"
version: "1.0.0"
---

# Complete Workflow Integration

## The Full Picture: Bringing It All Together

You've learned four tools individually:
- **Zed** (editor)
- **Ruff** (formatter + linter)
- **Pyright** (type checker)
- **uv** (package manager)

Now you'll integrate them into a **complete professional workflow**.

**The workflow sequence:**
1. **Code** in Zed
2. **Ruff formats** automatically on save
3. **Ruff lints** showing errors inline
4. **Pyright type-checks** showing type errors inline
5. **Save and commit** with confidence

---

## Creating a Complete Project from Scratch (Tier 1: Direct Steps)

Let's build a new project with everything integrated.

### Step 1: Initialize Project

```bash
uv init my-complete-project
cd my-complete-project
```

### Step 2: Add Development Tools

```bash
uv add ruff pyright --dev
```

**Verify installation:**
```bash
uv run ruff --version
uv run pyright --version
```

### Step 3: Open in Zed

```bash
zed .
```

Zed opens with your project. You're now ready to configure.

---

## Complete pyproject.toml Configuration (Tier 2: AI-Assisted)

Your project's `pyproject.toml` already has a basic structure from `uv init`. Now you'll add tool configuration.

**Ask your AI:**
```
I have a Python 3.13 project using uv, Ruff, and Pyright.
Create a complete pyproject.toml with:
- Project metadata (name, version, Python 3.13)
- Dev dependencies: ruff, pyright
- Ruff config: line-length 88, select E/F/B/I rules, double quotes, sort imports
- Pyright config: standard mode, Python 3.13

Show me the complete file ready to copy-paste.
```

**AI provides complete configuration. Copy into your `pyproject.toml`:**

```toml
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "my-complete-project"
version = "0.1.0"
description = "Professional Python project with Ruff and Pyright"
authors = [{name = "Your Name", email = "you@example.com"}]
requires-python = ">=3.13"

[dependency-groups]
dev = ["ruff>=0.14.0", "pyright>=1.1.400"]

[tool.ruff]
line-length = 88
target-version = "py313"

[tool.ruff.lint]
select = ["E", "F", "B", "I"]
ignore = ["E501"]

[tool.ruff.format]
quote-style = "double"
indent-style = "space"

[tool.pyright]
typeCheckingMode = "standard"
pythonVersion = "3.13"
reportMissingImports = "error"
reportUnknownVariableType = "warning"
```

**Save this file. Verify syntax:**
```bash
uv run ruff check .
uv run pyright
```

Both commands should succeed with no errors.

**Source**: Verified in intelligence/001-verified-tool-documentation.md

---

## Configure Zed for Dual LSP (Tier 2: Editor Integration)

Now Zed needs to know about **both Ruff and Pyright** so it shows errors in real-time.

Open Zed settings:
- Mac: `Cmd+,` (comma)
- Windows/Linux: `Ctrl+,`

Add this **Python language configuration**:

```json
{
  "languages": {
    "Python": {
      "language_servers": ["pyright", "ruff"],
      "formatter": "language_server",
      "format_on_save": true
    }
  },
  "lsp": {
    "ruff": {
      "initialization_options": {
        "settings": {
          "lineLength": 88
        }
      }
    },
    "pyright": {
      "initialization_options": {
        "python": {
          "pythonPath": ".venv/bin/python"
        }
      }
    }
  }
}
```

> **Windows Users**: Replace `"pythonPath": ".venv/bin/python"` with `"pythonPath": ".venv\\Scripts\\python.exe"` (note the double backslashes for escaping).

**What this does:**
- `language_servers: ["pyright", "ruff"]` — Zed runs both servers
- `formatter: "language_server"` — Zed uses LSP to format
- `format_on_save: true` — Automatically format when you save

**Save Zed settings. Restart Zed** (close and reopen).

**Source**: Verified in intelligence/001-verified-tool-documentation.md

---

## The Integrated Workflow in Action (Tier 1: Direct Usage)

Let's write code and watch all tools work together.

### Write Code with Deliberate Errors

In Zed, create a new file `app.py`:

```python
import os
import sys

def calculate_total(items: list) -> int:
    """Calculate total—with intentional errors."""
    return sum(items)  # Error: sum returns int, list type is vague

def greet(name) -> str:  # Error: missing type hint for parameter
    return f"Hello, {name}"

result = greet(42)  # Error: passing int where str expected
```

**Save the file** (Cmd+S or Ctrl+S).

**Watch what happens:**
- **Ruff formats automatically** (if format-on-save works): Fixes spacing, quotes
- **Ruff shows errors inline** (red squiggles): Unused imports `os`, `sys`
- **Pyright shows errors inline** (red squiggles): Type mismatches on `greet(42)`

### Read the Error Messages

Hover over any error in Zed to see details:

**Ruff errors (formatting/linting):**
- `F401 [*] 'os' imported but unused` — Remove this import

**Pyright errors (types):**
- `Argument of type "Literal[42]" cannot be assigned to parameter "name" of type "str"` — greet expects str, got int

### Fix the Code

```python
def calculate_total(items: list[int]) -> int:
    """Calculate total of integers."""
    return sum(items)

def greet(name: str) -> str:
    return f"Hello, {name}"

result = greet("Alice")  # Correct: pass a string
```

**Save again**. Errors disappear.

**Run both tools to confirm:**
```bash
uv run ruff check .
uv run pyright
```

Both commands report success (0 errors).

---

## Understanding Tool Responsibilities (Tier 1: Conceptual)

Each tool has a specific job:

| Tool | Job | Example |
|------|-----|---------|
| **Ruff Format** | Make code look consistent | `x=1` → `x = 1` |
| **Ruff Lint** | Find unused code, style problems | Unused imports, E501 |
| **Pyright** | Catch type mismatches | `str` expected, got `int` |

**Workflow order:**
1. **Format** (Ruff) — Make code look good
2. **Lint** (Ruff) — Find unused/bad code
3. **Type check** (Pyright) — Catch type errors
4. **Commit** (git) — Save clean code

**Why order matters:**
- Format first, so lint sees consistent code
- Type check last, because it's strictest
- Together, they catch most bugs before code runs

---

## Error Prioritization (Tier 1: Understand Priorities)

When you have multiple errors, which should you fix first?

**Priority order:**
1. **Type errors** (Pyright) — Fix these first; they're often actual bugs
2. **Lint errors** (Ruff check) — Fix next; they indicate unused or suspicious code
3. **Format issues** (Ruff format) — Fix last; auto-fixes most of these anyway

**Example:**
```python
x: int = "wrong"     # Error 1 (Pyright): type mismatch
y = 5                # Error 2 (Ruff): unused variable
def foo():return 1   # Error 3 (Ruff): needs formatting
```

**Fix in order:**
1. Change `"wrong"` to integer (type error)
2. Remove line `y = 5` (unused)
3. Format function (auto-fixes with `uv run ruff format .`)

---

## Awareness-Level Tools: pytest, pre-commit, MkDocs (Tier 2: Preview)

You don't have time to learn these today, but here are common tools you'll see:

### **pytest** — Testing framework
```toml
[dependency-groups]
dev = ["pytest>=7.0", "ruff>=0.14.0", "pyright>=1.1.400"]
```

Run tests before committing code.

### **pre-commit** — Automatic checks before git commit
```toml
# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: ruff-format
        name: ruff format
        entry: ruff format
        language: system
```

Prevents bad code from being committed.

### **MkDocs** — Documentation generator
```bash
uv add mkdocs --dev
uv run mkdocs serve
```

Auto-generates documentation from your README and docstrings.

**For now**: These are awareness-level. You'll learn them in later chapters. But notice they all fit into the same `uv`-based workflow.

---

## Try With AI

Use your AI companion for these exercises.

### Prompt 1: Create Complete Project (Tier 2 — Orchestration)

```
Create a new Python project from scratch with:
1. uv initialization
2. Ruff and Pyright added as dev dependencies
3. Complete pyproject.toml with configs for both tools
4. Zed settings.json with LSP for both tools

Show me every command and file I need to create.
Assume I'm on [macOS/Windows/Linux].
```

**Expected outcome:** Step-by-step instructions to build complete project; you follow along.

### Prompt 2: Understand Workflow (Tier 1 — Conceptual)

```
Explain the workflow for professional Python development:
1. Write code in Zed
2. Format with Ruff
3. Lint with Ruff
4. Type check with Pyright
5. Commit to git

What does each tool do? Why is the order important?
```

**Expected outcome:** Clear understanding that tools work together, each with a purpose.

### Prompt 3: Troubleshoot Integration (Tier 2 — Diagnosis)

```
I set up Ruff and Pyright in my project, but:
- Zed doesn't show Ruff errors inline
- Pyright shows "LSP not connected"

Diagnose what's wrong and show me how to fix it.
Show settings.json configuration if that's the issue.
```

**Expected outcome:** AI helps troubleshoot common integration problems.

---

## Red Flags to Watch

**Problem**: "Ruff and Pyright both show errors for the same line"
- **What it means**: They catch different things (Ruff = style, Pyright = types); both are valid
- **What to do**: Fix the Pyright error first (likely a real bug), then Ruff (style/unused code)
- **Example**: `x: int = "wrong"` — Pyright: type error; Ruff: might flag as unused later

**Problem**: "Format-on-save makes my code look weird"
- **What it means**: Ruff's default formatting (double quotes, 88 chars) doesn't match your preference
- **What to do**: Customize Ruff config in pyproject.toml (Lesson 9), or disable format-on-save in Zed if you prefer manual control
- **Workaround**: Run `uv run ruff format .` manually on your schedule

**Problem**: "LSP servers not connecting in Zed"
- **What it means**: Zed can't find Ruff or Pyright executable
- **What to do**: Verify both installed (`uv run ruff --version`, `uv run pyright --version`); restart Zed; check `.zed/settings.json` syntax
- **Nuclear option**: Delete `.venv` folder, run `uv sync` again

**Problem**: "My team has different code styles; how do we sync?"
- **What it means**: Each developer's Ruff config is different
- **What to do**: Share `pyproject.toml` via git; everyone clones and gets identical rules. This is why we version-control config!
- **Lesson 12** covers team scaling in detail

