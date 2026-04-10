CONCEPT 3: Folder Structure — The 3-Layer Architecture

1. WHAT IS THIS

sdet-stlc-portfolio/
├── pages/ ← POM layer (WHERE elements are)
├── tests/ ← Test layer (WHAT to verify)
├── fixtures/ ← Reusable setup (shared state)
├── playwright.config.ts ← Suite config (HOW to run)
└── package.json

2. WHY THIS IS USED

- Separation of concerns — one folder, one responsibility
- If VWO changes a selector → fix in pages/ only
- If you need a new test → only touch tests/
- Nothing bleeds into anything else

3. WHERE IT IS USED

- This is the Standard CLI structure that Playwright generates with npm init - playwright@latest
- Every enterprise Playwright project follows this pattern

4. HOW IT WORKS -

Folder Responsibility Contains
pages /Knows WHERE elements are LoginPage.ts, DashboardPage.tstests /Knows WHAT to verify login.spec.ts, dashboard.spec.ts
fixtures /Knows HOW to set up state auth.fixture.ts
playwright.config.ts /Knows HOW to runbrowsers, baseURL, retries

5. REAL PROJECT EXAMPLE

- pages/LoginPage.ts stores: email input locator, password input locator, login button locator
- tests/login.spec.ts calls: loginPage.fillEmail(), loginPage.clickLogin()
- Spec file never sees a raw selector string — only method calls

6. WHAT CAN GO WRONG

- Putting selectors directly in spec files → when VWO changes DOM, you fix 20 files
- Mixing test logic inside page objects → hard to maintain
- No fixtures folder → setup code duplicated in every test

7. HOW TO DEBUG

- If a selector breaks → check pages/LoginPage.ts only
- If a test logic fails → check tests/ only
- Config issue → only playwright.config.ts

8. INTERVIEW ANSWER

"I use a 3-layer Standard CLI structure: pages/ for POM locators, tests/ for spec files, and fixtures/ for reusable setup. This enforces separation of concerns — a selector change fixes one file, not every test. The config layer in playwright.config.ts controls browsers, baseURL, and retries independently of test logic."
