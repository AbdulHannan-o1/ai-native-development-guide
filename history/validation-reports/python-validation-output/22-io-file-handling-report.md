# Python Code Validation Report - 22-io-file-handling

**Generated:** 2025-11-12 13:58:11
**Python Version:** 3.14.0
**Container:** python-sandbox-validator

## Executive Summary

**Total Code Blocks:** 66
**Syntax Errors:** 0
**Runtime Errors:** 15
**Successful:** 51
**Success Rate:** 77.3%

❌ **VALIDATION FAILURES DETECTED**

- 0 syntax error(s) require immediate fix
- 15 runtime error(s) need review

---

## Results by File

### 01-console-io.md
- **Total Blocks:** 9
- **Errors:** 0
- **Status:** ✅ PASS

### 02-file-io.md
- **Total Blocks:** 18
- **Errors:** 2
- **Status:** ❌ FAIL (2 error(s))

**Error Details:**

- `02-file-io.md:307` (block 10)
  - **RUNTIME**: FileNotFoundError: [Errno 2] No such file or directory: 'nonexistent.txt'

- `02-file-io.md:317` (block 11)
  - **RUNTIME**: FileNotFoundError: [Errno 2] No such file or directory: '/root/private.txt'

### 03-pathlib.md
- **Total Blocks:** 20
- **Errors:** 8
- **Status:** ❌ FAIL (8 error(s))

**Error Details:**

- `03-pathlib.md:175` (block 4)
  - **RUNTIME**: NameError: name 'Path' is not defined

- `03-pathlib.md:218` (block 6)
  - **RUNTIME**: NameError: name 'Path' is not defined

- `03-pathlib.md:255` (block 8)
  - **RUNTIME**: NameError: name 'Path' is not defined

- `03-pathlib.md:263` (block 9)
  - **RUNTIME**: NameError: name 'Path' is not defined

- `03-pathlib.md:639` (block 16)
  - **RUNTIME**: NameError: name 'Path' is not defined

- `03-pathlib.md:657` (block 17)
  - **RUNTIME**: NameError: name 'test_dir' is not defined

- `03-pathlib.md:677` (block 18)
  - **RUNTIME**: NameError: name 'read_note' is not defined

- `03-pathlib.md:701` (block 19)
  - **RUNTIME**: FileNotFoundError: [Errno 2] No such file or directory: 'source.txt'

### 04-csv-json.md
- **Total Blocks:** 11
- **Errors:** 2
- **Status:** ❌ FAIL (2 error(s))

**Error Details:**

- `04-csv-json.md:271` (block 4)
  - **RUNTIME**: NameError: name 'json' is not defined. Did you forget to import 'json'?

- `04-csv-json.md:665` (block 10)
  - **RUNTIME**: NameError: name 'json' is not defined. Did you forget to import 'json'?

### 05-capstone.md
- **Total Blocks:** 8
- **Errors:** 3
- **Status:** ❌ FAIL (3 error(s))

**Error Details:**

- `05-capstone.md:725` (block 5)
  - **RUNTIME**: NameError: name 'json' is not defined. Did you forget to import 'json'?

- `05-capstone.md:737` (block 6)
  - **RUNTIME**: NameError: name 'BASE_DIR' is not defined

- `05-capstone.md:745` (block 7)
  - **RUNTIME**: SyntaxError: 'return' outside function


---

## Recommended Actions

### Medium Priority (Runtime Errors)
Review these—syntax is valid but execution fails:

- **04-csv-json.md:271** — Review runtime behavior
- **04-csv-json.md:665** — Review runtime behavior
- **05-capstone.md:725** — Review runtime behavior
- **05-capstone.md:737** — Review runtime behavior
- **05-capstone.md:745** — Review runtime behavior
- **02-file-io.md:307** — Review runtime behavior
- **02-file-io.md:317** — Review runtime behavior
- **03-pathlib.md:175** — Review runtime behavior
- **03-pathlib.md:218** — Review runtime behavior
- **03-pathlib.md:255** — Review runtime behavior
- **03-pathlib.md:263** — Review runtime behavior
- **03-pathlib.md:639** — Review runtime behavior
- **03-pathlib.md:657** — Review runtime behavior
- **03-pathlib.md:677** — Review runtime behavior
- **03-pathlib.md:701** — Review runtime behavior

