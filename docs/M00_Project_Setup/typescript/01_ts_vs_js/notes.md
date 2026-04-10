# CONCEPT — .ts vs .js + tsconfig.json

---

## 1. WHAT IS THIS

- `.ts` = TypeScript file — adds type checking on top of JavaScript
- `.js` = plain JavaScript — no type checking, no autocomplete
- TypeScript compiles TO JavaScript — browsers and Node.js never see `.ts`
- `tsconfig.json` = tells the TypeScript compiler how strict to be
- In Playwright: the test runner compiles `.ts` internally — no manual build step

---

## 2. WHY THIS IS USED

Three real benefits in order of importance:

| Benefit             | What it means in practice                                 |
| ------------------- | --------------------------------------------------------- |
| Error at write time | Typo in method name → red underline before running        |
| Autocomplete        | VS Code suggests all Playwright methods on typed objects  |
| Null safety         | Forced to handle null before accessing element properties |

Without TypeScript:

- `loginPage.fillEmil()` typo → test runs, crashes, you debug for 10 minutes
  With TypeScript:
- `loginPage.fillEmil()` typo → red underline appears as you type

---

## 3. WHERE IT IS USED

| File                    | Extension | Why                                |
| ----------------------- | --------- | ---------------------------------- |
| `pages/LoginPage`       | `.ts`     | POM class — needs typed locators   |
| `tests/login.spec`      | `.ts`     | Spec file — needs typed assertions |
| `fixtures/auth.fixture` | `.ts`     | Fixture — needs typed extensions   |
| `playwright.config`     | `.ts`     | Config — needs `defineConfig` type |
| `tsconfig.json`         | `.json`   | At project root — read by VS Code  |

---

## 4. HOW IT WORKS

### Minimal tsconfig.json for Playwright

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "types": ["node"]
  }
}
```

### Every setting explained

| Setting                 | What it does                              | Why it matters                   |
| ----------------------- | ----------------------------------------- | -------------------------------- |
| `target: ES2020`        | Compiles to ES2020 JavaScript             | Supports `async/await` natively  |
| `module: commonjs`      | Uses `require()` style imports internally | Node.js compatibility            |
| `strict: true`          | Enables all strict type checks            | Catches null + implicit any      |
| `esModuleInterop: true` | Allows `import x from 'module'` syntax    | Works with Playwright imports    |
| `types: ["node"]`       | Adds Node.js type definitions             | `process.env.CI` works in config |

### Compilation flow

You write: TypeScript compiles: Playwright runs:
LoginPage.ts → LoginPage.js → npx playwright test
login.spec.ts → login.spec.js → (internally)
You never see the .js files — Playwright handles this
You never run tsc manually — Playwright handles this

### Where to place tsconfig.json

repo-root/
├── tsconfig.json ← HERE — same level as package.json
├── package.json
├── playwright.config.ts
├── pages/
└── tests/

If placed inside a subfolder — VS Code and Playwright may not find it.

---

## 5. REAL PROJECT EXAMPLE

### Typo caught at write time

```typescript
// pages/LoginPage.ts
export class LoginPage {
  async fillEmail(email: string): Promise<void> { ... }
  async fillPassword(password: string): Promise<void> { ... }
  async clickLogin(): Promise<void> { ... }
}

// tests/login.spec.ts
const loginPage = new LoginPage(page);

loginPage.fillEmil('test@wingify.com');
// ❌ RED ERROR: Property 'fillEmil' does not exist on type 'LoginPage'
// Did you mean 'fillEmail'?

// Without TypeScript: test runs, fills nothing, assertion fails
// You debug for 10 minutes to find a typo
// With TypeScript: found in 2 seconds before running
```

### Playwright types give full autocomplete

```typescript
import { Page, Locator } from "@playwright/test";

class LoginPage {
  readonly page: Page; // type Page
  readonly emailInput: Locator; // type Locator

  constructor(page: Page) {
    this.page = page;
    // Type 'page' — VS Code shows ALL Page methods:
    // page.goto(), page.getByRole(), page.route(), etc.

    this.emailInput = page.getByRole("textbox", { name: "Email address" });
    // Type 'Locator' — VS Code shows ALL Locator methods:
    // .fill(), .click(), .isVisible(), .waitFor(), etc.
  }
}
```

---

## 6. WHAT CAN GO WRONG

| Mistake                            | What breaks                                      | Fix                                         |
| ---------------------------------- | ------------------------------------------------ | ------------------------------------------- |
| Missing `tsconfig.json` at root    | VS Code shows errors everywhere                  | Create tsconfig.json at repo root           |
| Wrong `module` setting             | Playwright imports break                         | Use `"module": "commonjs"`                  |
| Missing `types: ["node"]`          | `process.env` shows error in config              | Add `"types": ["node"]`                     |
| `strict: true` on existing project | 50+ errors appear at once                        | Fix one file at a time, start with pages/   |
| Using `.js` for spec files         | No type checking on test code                    | Rename to `.ts`, install `@playwright/test` |
| `esModuleInterop: false`           | `import { test } from '@playwright/test'` breaks | Set `esModuleInterop: true`                 |

---

## 7. HOW TO DEBUG

```bash
# Type-check entire project without running tests
npx tsc --noEmit
# Zero output = no errors
# Error output = file name + line number + what's wrong

# Check TypeScript version
npx tsc --version

# Check tsconfig is being found
npx tsc --showConfig
# Shows the complete resolved config being used
```

In VS Code:

- View → Problems panel → shows all TypeScript errors across all files
- Hover over red underline → shows exact error message
- `Ctrl + .` on red underline → shows suggested fixes

---

## 8. INTERVIEW ANSWER

"I use TypeScript for all Playwright files — page objects,
spec files, fixtures, and config. The core benefit is errors
at write time rather than runtime. A typo in a locator method
name like `fillEmil` instead of `fillEmail` shows as a red
underline immediately in VS Code — I catch it in 2 seconds
instead of debugging for 10 minutes after a failed test run.

`tsconfig.json` at project root sets `strict: true` for null
safety, `types: ['node']` so `process.env` works in config,
and `esModuleInterop: true` for clean Playwright imports.

Playwright's test runner handles TypeScript compilation
internally — I write `.ts` files and run `npx playwright test`
directly. No separate build step needed."

---

## Connection Forward

.ts knowledge + tsconfig.json
↓
M01_Selectors_POM
→ LoginPage.ts uses Page and Locator types
→ TypeScript autocomplete shows all getByRole() options
.ts knowledge
↓
M02_Test_Cases
→ login.spec.ts uses test() and expect() — both typed
→ TypeScript catches wrong assertion types at write time
