CONCEPT 7: import/export (Modules)

1. WHAT IS THIS

- export = make something available to other files
- import = bring it into the current file
  This is how LoginPage.ts gets used inside login.spec.ts

2. WHY THIS IS USED

- Without modules: one giant file with all tests and all selectors — unmaintainable
- With modules: each file has one job, imports what it needs

3. WHERE IT IS USED

- pages/LoginPage.ts → exports the class
- tests/login.spec.ts → imports it

4. HOW IT WORKS

- typescript :-
  // pages/LoginPage.ts
  export class LoginPage { // ← export makes it available
  // ...
  }

// tests/login.spec.ts
import { LoginPage } from '../pages/LoginPage'; // ← import uses it

- Two types:

- typescript :-
  // Named export (most common in Playwright)
  export class LoginPage {}
  import { LoginPage } from '../pages/LoginPage';

// Default export
export default class LoginPage {}
import LoginPage from '../pages/LoginPage';

5. REAL PROJECT EXAMPLE

- typescript :-
  // Every spec file starts with this pattern:
  import { test, expect } from '@playwright/test';
  import { LoginPage } from '../pages/LoginPage';
  import { testData } from '../fixtures/testData';

// test() and expect() come from Playwright library
// LoginPage comes from your pages folder
// testData comes from your fixtures folder

6. WHAT CAN GO WRONG

- Wrong relative path: '../pages/loginPage' (lowercase l) → import fails on Linux CI (case-sensitive filesystem)
- Exporting with export default and importing with { } curly braces → undefined

7. HOW TO DEBUG

- Red underline on import path → hover to see exact error
- Cannot find module at runtime → path or filename mismatch

8. INTERVIEW ANSWER

"I use ES module syntax — named exports for page objects and fixtures. LoginPage is exported from pages/ and imported into spec files. This keeps concerns separated — spec files only know the method names, not the selector implementation. Path errors on CI are usually case-sensitivity issues with filenames."
