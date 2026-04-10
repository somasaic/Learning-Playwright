# CONCEPT — tsconfig.json

---

## 1. WHAT IS THIS

- `tsconfig.json` is the instruction file for the TypeScript compiler
- It tells TypeScript:
  - HOW STRICT to be when checking types
  - WHICH files to compile
  - WHERE to output compiled JavaScript
  - WHAT JavaScript version to target
- Sits at project root — same level as `package.json`
- VS Code reads it automatically — no command needed

---

## 2. WHY THIS IS USED

- Without it: TypeScript uses loose defaults — many errors go unnoticed
- With it: consistent type checking rules across every file in the project
- Playwright needs specific settings to work correctly with TypeScript
- Wrong settings = import errors, `process.env` errors, broken compilation

---

## 3. WHERE IT IS USED

repo-root/
├── tsconfig.json        ← HERE — must be at root
├── package.json
├── playwright.config.ts
├── pages/
│   └── LoginPage.ts     ← compiled because included in "include"
├── tests/
│   └── login.spec.ts    ← compiled because included in "include"
└── fixtures/
└── auth.fixture.ts  ← compiled because included in "include"

If `tsconfig.json` is missing at root:
- VS Code shows errors everywhere
- `process.env` shows red underline in config
- Playwright may not resolve imports correctly

---

## 4. EVERY SETTING EXPLAINED

```json
{
  "compilerOptions": {

    "target": "ES2020",
    // OUTPUT JavaScript version
    // ES2020 supports async/await, optional chaining (?.)
    // Playwright requires ES2017 minimum — ES2020 is safe

    "module": "commonjs",
    // How imports/exports are compiled
    // commonjs = require() style — Node.js compatible
    // If set to ESNext — Playwright imports may break

    "moduleResolution": "node",
    // How TypeScript finds imported files
    // "node" = looks in node_modules (standard)
    // Required for @playwright/test imports to resolve

    "strict": true,
    // Enables ALL strict checks at once:
    // - noImplicitAny (no untyped variables)
    // - strictNullChecks (handle null explicitly)
    // - strictFunctionTypes (function types must match)
    // Most important setting in this file

    "esModuleInterop": true,
    // Allows: import { test } from '@playwright/test'
    // Without it: import * as playwright from '@playwright/test'
    // Makes imports cleaner and more readable

    "skipLibCheck": true,
    // Skips type checking of .d.ts files in node_modules
    // Speeds up compilation
    // Prevents errors from third-party library type conflicts

    "types": ["node"],
    // Tells TypeScript about Node.js global types
    // Enables: process.env.CI in playwright.config.ts
    // Without this: process.env shows "Cannot find name" error

    "outDir": "./dist",
    // Where compiled .js files go
    // Playwright uses its own compilation — this rarely matters
    // Good practice to separate source from compiled output

    "rootDir": "./"
    // Where source .ts files live
    // Must match the paths in "include"
  },

  "include": [
    "pages/**/*.ts",       // all .ts files inside pages/ and subfolders
    "tests/**/*.ts",       // all .ts files inside tests/ and subfolders
    "fixtures/**/*.ts",    // all .ts files inside fixtures/ and subfolders
    "playwright.config.ts" // the config file specifically
  ],

  "exclude": [
    "node_modules",    // never compile dependencies
    "dist",            // never recompile already-compiled output
    "test-results"     // never compile Playwright output files
  ]
}
```

---

## 5. REAL PROJECT EXAMPLE

### What breaks without correct tsconfig settings

```typescript
// playwright.config.ts

// Without "types": ["node"]
retries: process.env.CI ? 1 : 0
// ❌ ERROR: Cannot find name 'process'
// FIX: add "types": ["node"] to tsconfig

// Without "esModuleInterop": true
import { defineConfig } from '@playwright/test'
// ❌ ERROR: Module has no exported member 'defineConfig'
// FIX: add "esModuleInterop": true

// Without "module": "commonjs"
import { LoginPage } from '../pages/LoginPage'
// ❌ ERROR: Cannot use import statement in module
// FIX: set "module": "commonjs"
```

### What correct tsconfig enables

```typescript
// pages/LoginPage.ts — all of this works because of tsconfig

import { Page, Locator } from '@playwright/test';  // esModuleInterop: true
// Page and Locator resolve because moduleResolution: node

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;

  constructor(page: Page) {          // strict: true enforces this type
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email address' });
  }

  async fillEmail(email: string): Promise<void> {   // strict: true checks this
    await this.emailInput.fill(email);
  }
}
```

---

## 6. WHAT CAN GO WRONG

| Mistake | Error you see | Fix |
|---------|--------------|-----|
| Missing `tsconfig.json` at root | Red underlines everywhere in VS Code | Create `tsconfig.json` at repo root |
| Missing `"types": ["node"]` | `Cannot find name 'process'` | Add `"types": ["node"]` |
| `"module": "ESNext"` instead of `"commonjs"` | Import errors in Playwright | Change to `"module": "commonjs"` |
| Missing `"esModuleInterop": true` | Named import errors | Add `"esModuleInterop": true` |
| Wrong `"include"` paths | TypeScript misses your files | Check paths match actual folder names |
| `tsconfig.json` inside subfolder | VS Code and Playwright can't find it | Move to project root |
| `strict: false` | Bugs slip through to runtime | Always keep `strict: true` |

---

## 7. HOW TO DEBUG

```bash
# Check if tsconfig.json is being found and what it resolves to
npx tsc --showConfig
# Prints the complete merged config TypeScript is using
# If output is wrong — tsconfig.json is not at root

# Type check all files without running tests
npx tsc --noEmit
# Zero output = no type errors
# Errors show: filename, line number, exact problem

# Check which files are included
npx tsc --listFiles
# Shows every .ts file TypeScript is compiling
# If a file is missing here — check "include" paths

# Validate tsconfig.json is not broken JSON
node -e "require('./tsconfig.json')"
# No output = valid JSON
# Error = broken JSON syntax — trailing comma or bad quote
```

In VS Code:
- `Ctrl + Shift + P` → "TypeScript: Restart TS Server"
- Use this when VS Code shows errors that should not exist
- Restarts the TypeScript language server — clears stale cache

---

## 8. INTERVIEW ANSWER

"`tsconfig.json` is the TypeScript compiler configuration. The
most important setting is `strict: true` — it enables all strict
type checks which catch null errors and implicit any types before
tests run.

`types: ['node']` is required so `process.env.CI` works inside
`playwright.config.ts` — without it, process shows a red error.
`esModuleInterop: true` enables clean named imports from
`@playwright/test`. `module: commonjs` ensures Node.js
compatibility for all Playwright imports.

I keep `tsconfig.json` at the project root alongside
`package.json` — if it is in a subfolder, VS Code and Playwright
cannot find it and errors appear across the entire codebase.
I debug type errors with `npx tsc --noEmit` which shows all type
problems without running any tests."

---

## Connection Forward

tsconfig.json
↓
Every .ts file in the project depends on this
↓
M01_Selectors_POM
→ LoginPage.ts compiles because pages/ is in "include"
→ Page and Locator types resolve because of moduleResolution: node
tsconfig.json strict: true
↓
M02_Test_Cases
→ test() and expect() are fully typed
→ Wrong assertion types caught at write time

### Quick Validation

# After saving tsconfig.json at repo root
# Run this to confirm no errors
npx tsc --noEmit

# Should output nothing
# If it outputs errors — fix them one by one
# Most common first error: missing @playwright/test
# Fix: npm install @playwright/test