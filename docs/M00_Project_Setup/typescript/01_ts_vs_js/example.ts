// ============================================
// .ts vs .js — What TypeScript adds
// Location: typescript/01_ts_vs_js/example.ts
// ============================================


// -----------------------------------------------
// PART 1: THE CORE DIFFERENCE
// -----------------------------------------------

// .js file — no type checking
// JavaScript accepts anything silently
// Errors appear at RUNTIME — when tests are running

// .ts file — type checking at WRITE time
// TypeScript checks types as you type
// Errors appear BEFORE running — red underline in VS Code


// -----------------------------------------------
// PART 2: JS vs TS side by side
// -----------------------------------------------

// ❌ JavaScript — no protection
// function loginUser(email, password) {
//   // email and password could be anything
//   // number, boolean, undefined — JS accepts all
// }
// loginUser(123, true);   // no error in JS — crashes silently

// ✅ TypeScript — protected
function loginUser(email: string, password: string): void {
  console.log(`Logging in: ${email}`);
}

loginUser('test@wingify.com', 'Test@1234');  // ✅ correct
// loginUser(123, true);   // ❌ RED ERROR immediately
// Argument of type 'number' is not assignable to parameter of type 'string'


// -----------------------------------------------
// PART 3: TYPO PROTECTION — real SDET scenario
// -----------------------------------------------

class LoginPage {
  fillEmail(email: string): void {
    console.log(`Filling email: ${email}`);
  }

  fillPassword(password: string): void {
    console.log(`Filling password`);
  }

  clickLogin(): void {
    console.log('Clicking login button');
  }
}

const loginPage = new LoginPage();

// ✅ Correct — TypeScript autocompletes method names
loginPage.fillEmail('test@wingify.com');
loginPage.fillPassword('Test@1234');
loginPage.clickLogin();

// ❌ Typo — TypeScript catches BEFORE test runs
// loginPage.fillEmil('test@wingify.com');
// Property 'fillEmil' does not exist on type 'LoginPage'
// Did you mean 'fillEmail'?


// -----------------------------------------------
// PART 4: NULL PROTECTION — catches runtime crashes
// -----------------------------------------------

// ❌ JavaScript — crashes at runtime silently
// const button = document.getElementById('login-btn');
// button.click();   // button could be null — crashes at runtime

// ✅ TypeScript with strict: true — forces you to handle null
const button = document.getElementById('login-btn');
if (button) {
  button.click();   // safe — TypeScript verified it exists
}

// In Playwright this is handled by Locator type
// Playwright's Locator is never null — it is lazy
// The element is found at action time, not creation time


// -----------------------------------------------
// PART 5: HOW COMPILATION WORKS
// -----------------------------------------------

// TypeScript is NOT understood by browsers or Node.js directly
// It must be compiled to JavaScript first

// .ts file                .js file
// loginPage.ts  →  tsc  →  loginPage.js  →  Node.js runs this

// BUT in Playwright — you never run tsc manually
// Playwright's test runner compiles .ts → .js internally
// You write .ts, Playwright handles the rest

// This is why you can run:
// npx playwright test
// Without a separate build step


// -----------------------------------------------
// PART 6: TYPES YOU USE DAILY IN PLAYWRIGHT
// -----------------------------------------------

// Import Playwright types
import { Page, Locator, Browser } from '@playwright/test';

// Page — represents one browser tab
// Locator — lazy pointer to a DOM element
// Browser — the browser instance itself

// Using these types in a class
class LoginPageTyped {
  readonly page: Page;         // typed as Page — not any
  readonly emailInput: Locator; // typed as Locator — not any

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email address' });
    // VS Code autocompletes getByRole because page is typed as Page
    // Without the type — no autocomplete, no error catching
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
    // .fill() autocompletes because emailInput is typed as Locator
  }
}


// -----------------------------------------------
// PART 7: .ts vs .js — when to use which
// -----------------------------------------------

// Use .ts for:
// - pages/LoginPage.ts      ← POM classes
// - tests/login.spec.ts     ← spec files
// - fixtures/auth.fixture.ts ← fixtures
// - playwright.config.ts    ← config

// Use .js for:
// - Learning exercises (this folder)
// - Quick scripts that don't need type safety
// - Node.js utility scripts

// In a real Playwright framework: EVERYTHING is .ts
// The only .js files are package.json and jsconfig.json (config files)