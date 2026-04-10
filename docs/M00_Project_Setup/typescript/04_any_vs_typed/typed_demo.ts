// ============================================
// type: any vs typed — SDET level understanding
// Location: typescript/04_any_vs_typed/typed_demo.ts
// ============================================


// -----------------------------------------------
// PART 1: WHAT 'any' DOES — and why it is dangerous
// -----------------------------------------------

// any = TypeScript completely gives up checking this variable
// It accepts everything — number, string, object, null, function

let userData: any = { email: 'test@wingify.com' };
userData = 12345;           // no error — any accepts number
userData = true;            // no error — any accepts boolean
userData = null;            // no error — any accepts null
userData.wrongMethod();     // no error — crashes at RUNTIME

// This is TypeScript behaving exactly like JavaScript
// You get zero protection, zero autocomplete
// The red underline that would save you — is gone


// -----------------------------------------------
// PART 2: TYPED PROPERLY — what you always do instead
// -----------------------------------------------

// Basic types
let count: number = 5;
let testName: string = 'TC-01 login smoke';
let isVisible: boolean = true;
let tags: string[] = ['smoke', 'login', 'regression'];
let status: null = null;

// count = 'hello';     // ❌ RED ERROR — string not assignable to number
// isVisible = 5;       // ❌ RED ERROR — number not assignable to boolean


// -----------------------------------------------
// PART 3: INTERFACE — typed object shape
// This is what you use for test data
// -----------------------------------------------

interface Credentials {
  email: string;
  password: string;
}

interface TestUser extends Credentials {
  role: string;
  isActive: boolean;
}

// ✅ Correct usage
const validUser: Credentials = {
  email: 'test@wingify.com',
  password: 'Test@1234'
};

// ❌ Missing required key
// const brokenUser: Credentials = {
//   email: 'test@wingify.com'
//   // ERROR: Property 'password' is missing
// };

// ❌ Extra unexpected key
// const extraUser: Credentials = {
//   email: 'test@wingify.com',
//   password: 'Test@1234',
//   role: 'admin'
//   // ERROR: Object literal may only specify known properties
// };

// ✅ Extended interface — inherits email + password, adds more
const fullUser: TestUser = {
  email: 'test@wingify.com',
  password: 'Test@1234',
  role: 'admin',
  isActive: true
};


// -----------------------------------------------
// PART 4: PLAYWRIGHT TYPES — Page and Locator
// -----------------------------------------------

import { Page, Locator } from '@playwright/test';

// ❌ BAD — any type — you lose everything
class LoginPageBad {
  page: any;           // no autocomplete for page methods
  emailInput: any;     // no autocomplete for locator methods

  constructor(page: any) {
    this.page = page;
    this.emailInput = page.getByRole('textbox');
    // VS Code cannot suggest .fill() .click() .isVisible()
    // Because it doesn't know emailInput is a Locator
  }

  async fillEmail(email: any): Promise<void> {
    // email: any means you could pass a number — no error
    // fillEmail(12345) would have no red underline
    await this.emailInput.fill(email);
  }
}

// ✅ GOOD — properly typed
export class LoginPage {
  readonly page: Page;            // Page type — all Page methods available
  readonly emailInput: Locator;   // Locator type — all Locator methods available
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {       // parameter typed as Page
    this.page = page;
    // VS Code now autocompletes all page methods:
    // page.goto(), page.getByRole(), page.route(), page.waitForResponse()

    this.emailInput    = page.getByRole('textbox', { name: 'Email address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.login