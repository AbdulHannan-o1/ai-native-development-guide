# Python Code Validation Report - 24-oop-part-1

**Generated:** 2025-11-12 13:44:59
**Python Version:** 3.14.0
**Container:** python-sandbox-validator

## Executive Summary

**Total Code Blocks:** 60
**Syntax Errors:** 5
**Runtime Errors:** 18
**Successful:** 37
**Success Rate:** 61.7%

❌ **VALIDATION FAILURES DETECTED**

- 5 syntax error(s) require immediate fix
- 18 runtime error(s) need review

---

## Results by File

### 01-oop-fundamentals.md
- **Total Blocks:** 7
- **Errors:** 1
- **Status:** ❌ FAIL (1 error(s))

**Error Details:**

- `01-oop-fundamentals.md:212` (block 3)
  - **RUNTIME**: AttributeError: 'Camera' object has no attribute '_capture_frame'

### 02-classes-and-objects-basics.md
- **Total Blocks:** 13
- **Errors:** 5
- **Status:** ❌ FAIL (5 error(s))

**Error Details:**

- `02-classes-and-objects-basics.md:127` (block 1)
  - **RUNTIME**: NameError: name 'Dog' is not defined

- `02-classes-and-objects-basics.md:205` (block 4)
  - **RUNTIME**: NameError: name 'dog1' is not defined

- `02-classes-and-objects-basics.md:293` (block 7)
  - **RUNTIME**: NameError: name 'dog1' is not defined

- `02-classes-and-objects-basics.md:406` (block 10)
  - **RUNTIME**: NameError: name 'Dog' is not defined

- `02-classes-and-objects-basics.md:430` (block 12)
  - **RUNTIME**: AttributeError: type object 'Dog' has no attribute 'name'

### 03-constructors-destructors-attributes.md
- **Total Blocks:** 12
- **Errors:** 1
- **Status:** ❌ FAIL (1 error(s))

**Error Details:**

- `03-constructors-destructors-attributes.md:363` (block 9)
  - **SYNTAX**: parameter without a default follows parameter with a default

### 04-encapsulation-method-types.md
- **Total Blocks:** 16
- **Errors:** 6
- **Status:** ❌ FAIL (6 error(s))

**Error Details:**

- `04-encapsulation-method-types.md:143` (block 1)
  - **TIMEOUT**: Execution exceeded 5 second timeout

- `04-encapsulation-method-types.md:172` (block 3)
  - **RUNTIME**: NameError: name 'BankAccount' is not defined

- `04-encapsulation-method-types.md:299` (block 8)
  - **RUNTIME**: NameError: name 'Temperature' is not defined

- `04-encapsulation-method-types.md:342` (block 10)
  - **RUNTIME**: NameError: name 'calculator' is not defined

- `04-encapsulation-method-types.md:369` (block 11)
  - **TIMEOUT**: Execution exceeded 5 second timeout

- `04-encapsulation-method-types.md:389` (block 12)
  - **RUNTIME**: ValueError: Radius must be positive

### 05-game-character-capstone.md
- **Total Blocks:** 12
- **Errors:** 10
- **Status:** ❌ FAIL (10 error(s))

**Error Details:**

- `05-game-character-capstone.md:221` (block 1)
  - **RUNTIME**: NameError: name 'Character' is not defined

- `05-game-character-capstone.md:299` (block 2)
  - **RUNTIME**: NameError: name 'Character' is not defined

- `05-game-character-capstone.md:403` (block 4)
  - **RUNTIME**: NameError: name 'Player' is not defined

- `05-game-character-capstone.md:470` (block 5)
  - **RUNTIME**: NameError: name 'player' is not defined

- `05-game-character-capstone.md:476` (block 6)
  - **RUNTIME**: NameError: name 'player' is not defined

- `05-game-character-capstone.md:490` (block 7)
  - **SYNTAX**: expected an indented block after function definition on line 1

- `05-game-character-capstone.md:495` (block 8)
  - **SYNTAX**: expected an indented block after function definition on line 1

- `05-game-character-capstone.md:503` (block 9)
  - **SYNTAX**: expected an indented block after function definition on line 2

- `05-game-character-capstone.md:509` (block 10)
  - **SYNTAX**: expected an indented block after function definition on line 1

- `05-game-character-capstone.md:524` (block 11)
  - **RUNTIME**: NameError: name 'Player' is not defined


---

## Recommended Actions

### High Priority (Syntax Errors)
Fix these immediately—code will not run:

- **05-game-character-capstone.md:490** — expected an indented block after function definition on line 1
- **05-game-character-capstone.md:495** — expected an indented block after function definition on line 1
- **05-game-character-capstone.md:503** — expected an indented block after function definition on line 2
- **05-game-character-capstone.md:509** — expected an indented block after function definition on line 1
- **03-constructors-destructors-attributes.md:363** — parameter without a default follows parameter with a default

### Medium Priority (Runtime Errors)
Review these—syntax is valid but execution fails:

- **05-game-character-capstone.md:221** — Review runtime behavior
- **05-game-character-capstone.md:299** — Review runtime behavior
- **05-game-character-capstone.md:403** — Review runtime behavior
- **05-game-character-capstone.md:470** — Review runtime behavior
- **05-game-character-capstone.md:476** — Review runtime behavior
- **05-game-character-capstone.md:524** — Review runtime behavior
- **01-oop-fundamentals.md:212** — Review runtime behavior
- **02-classes-and-objects-basics.md:127** — Review runtime behavior
- **02-classes-and-objects-basics.md:205** — Review runtime behavior
- **02-classes-and-objects-basics.md:293** — Review runtime behavior
- **02-classes-and-objects-basics.md:406** — Review runtime behavior
- **02-classes-and-objects-basics.md:430** — Review runtime behavior
- **04-encapsulation-method-types.md:143** — Review runtime behavior
- **04-encapsulation-method-types.md:172** — Review runtime behavior
- **04-encapsulation-method-types.md:299** — Review runtime behavior
- **04-encapsulation-method-types.md:342** — Review runtime behavior
- **04-encapsulation-method-types.md:369** — Review runtime behavior
- **04-encapsulation-method-types.md:389** — Review runtime behavior

