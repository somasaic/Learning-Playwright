# M00 — Project Setup

## Module Status: ✅ Complete

## What This Module Covers

This is the **foundation module** that teaches you how to scaffold a professional Playwright project from zero. It covers folder structure decisions, why they matter, and how to configure TypeScript + Playwright for a real testing environment.

Every SDET role expects you to understand: *Why is my project organized this way?* This module answers that question.

---

## Concepts Covered

### JavaScript (4 sub-topics)
- **01 Terminal Commands** — Essential commands to run tests, install packages, manage the project
- **02 Objects** — Key-value pairs, how data is structured in testing (credentials, config)
- **03 JSON** — JSON stringify/parse, test data formats, fixtures
- **04 Modules** — import/export, reusable code patterns, keeping tests DRY

### TypeScript (4 sub-topics)
- **01 TS vs JS** — Why TypeScript? Type safety in a test framework
- **02 tsconfig.json** — Configuration: strict mode, ES modules, source maps
- **03 Strict Mode** — strictNullChecks, strictFunctionTypes, catching bugs early
- **04 any vs typed** — Why 'never use any', typed properties for maintainability

### Playwright (4 sub-topics)
- **01 npm init** — Creating package.json, understanding dependencies vs devDependencies
- **02 Install** — Installing Playwright, browsers, headless execution
- **03 Config** — playwright.config.ts structure, browsers, baseURL, workers
- **04 baseURL + timeout** — Why baseURL eliminates hardcoded URLs, timeout strategies

---

## Key Files in This Module

| File Path | Purpose | Type |
|-----------|---------|------|
| docs/M00_Project_Setup/01_folder_structure.md | Deep dive into 3-layer architecture | Concept |
| docs/M00_Project_Setup/javascript/01_terminal_commands/ | npm, npx, playwright commands | Reference |
| docs/M00_Project_Setup/javascript/02_objects/ | Config/credentials patterns | Code Example |
| docs/M00_Project_Setup/javascript/03_json/ | JSON for test data | Code Example |
| docs/M00_Project_Setup/typescript/02_tsconfig/ | Working tsconfig.json | Config |
| docs/M00_Project_Setup/playwright/03_config/ | Minimal playwright.config.ts | Config |

---

## Interview Questions Answered by This Module

### Q1: "Tell me about your project folder structure"
**Answer Framework (from 01_folder_structure.md):**
`
sdet-stlc-portfolio/
├── pages/        ← Contains all Page Object classes
├── tests/        ← Contains all test specs
├── fixtures/     ← Reusable setup (auth, database)
├── utils/        ← Helper functions
└── playwright.config.ts
`
**Why:** Separation of concerns. When VWO changes a selector, I fix only pages/, not 20 test files.

---

### Q2: "What does your package.json tell me?"
**Answer Framework:**
`json
{
  "devDependencies": {
    "playwright": "~1.58.2"    // Latest stable
    "@playwright/test": "~1.58.2"
    "typescript": "^5.0"
    "@types/node": "^20.0"
  }
}
`
**Why:** 
- ~ version = lock minor version (stable)
- devDependencies only = tests don't ship to production
- TypeScript = type safety, better IDE support

---

### Q3: "What's your playwright.config.ts strategy?"
**Answer Framework:**
`	ypescript
export default defineConfig({
  testDir: './tests',
  timeout: 30000,              // Each test max 30s
  expect: { timeout: 5000 },   // Each assertion max 5s
  fullyParallel: true,
  workers: 4,
  use: {
    baseURL: 'https://vwo.com',  // No hardcoded URLs
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
`
**Why:** 
- Centralized config = change once, affects all tests
- baseURL = easier to test staging vs prod
- Parallel workers = 4x faster test runs

---

### Q4: "Do you use TypeScript? Why?"
**Answer Framework (from typescript/02_tsconfig/):**
`	ypescript
// ❌ Without TypeScript
const login = (username, password) => {
  // Did they mean a string? A number? Unclear
  page.fill(selector, username);
}

// ✅ With TypeScript
const login = (username: string, password: string): Promise<void> => {
  page.fill(selector, username);
}
`
**Why:**
- Catches errors at write-time, not runtime
- IDEs auto-complete methods
- Self-documents function expectations

---

### Q5: "What's the difference between 'any' and typed properties?"
**Answer Framework (from typescript/04_any_vs_typed/):**
`	ypescript
// ❌ Loses type safety
const config: any = { baseURL: 123 };  // Typo! Not caught

// ✅ Catches errors
interface Config {
  baseURL: string;
  timeout: number;
}
const config: Config = { baseURL: 123 };  // ERROR: must be string
`
**Why:** Prevents bugs before they happen

---

## Reference Documents

📄 [Full Folder Structure Deep Dive](./01_folder_structure.md)  
📄 [Terminal Commands Cheatsheet](./javascript/01_terminal_commands/commands_referenece.md)  
📄 [TypeScript tsconfig.json Explained](./typescript/02_tsconfig/notes.md)  
📄 [Playwright Config Strategies](./playwright/03_config/notes.md)

---

## What Comes After M00?

**M01 — Selectors + Page Object Model**
- Build your first LoginPage.ts using what you learned here
- Apply class structure, constructor, typed properties
- Create real locators and methods

---

## How to Use This Module

1. **Read** 01_folder_structure.md first — understand the 'why'
2. **Study** the sub-folders in order: JS → TS → PW
3. **Run commands** from terminal_commands/ in your own project
4. **Reference** configs when building your project
5. **Answer** the interview questions above to yourself before M01

---

## Status Checklist

- [x] Folder structure documented
- [x] JavaScript concepts explained (objects, JSON, modules)
- [x] TypeScript config patterns shown
- [x] Playwright config examples provided
- [x] Interview questions answered
- [ ] (Next: Hands-on lab)

---

*Last Updated: April 10, 2026*
