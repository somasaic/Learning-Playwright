// ============================================
// strict mode — what it does and why it matters
// ============================================

// strict: true in tsconfig.json enables ALL of these:

// -----------------------------------------------
// 1. NO IMPLICIT ANY
// -----------------------------------------------

// ❌ Without strict — TypeScript silently accepts this
function getUser(id) {          // id is implicitly 'any' — no error
  return id;
}

// ✅ With strict: true — this ERRORS immediately
// Parameter 'id' implicitly has an 'any' type
// Fix:
function getUserStrict(id: string): string {
  return id;
}


// -----------------------------------------------
// 2. STRICT NULL CHECKS
// -----------------------------------------------

// ❌ Without strict — this crashes at runtime
// const input = document.getElementById('email');
// input.value = 'test';   // input could be null — runtime crash

// ✅ With strict: true — TypeScript forces you to handle null
const input = document.getElementById('email');
if (input) {
  (input as HTMLInputElement).value = 'test';   // safe
}


// -----------------------------------------------
// 3. WHY THIS MATTERS IN PLAYWRIGHT
// -----------------------------------------------

import { Page, Locator } from '@playwright/test';

export class LoginPage {

  readonly page: Page;
  readonly emailInput: Locator;

  constructor(page: Page) {       // ← strict forces Page type here
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email address' });
  }

  async fillEmail(email: string): Promise<void> {   // ← strict forces string type
    await this.emailInput.fill(email);
  }

  // ❌ This would ERROR with strict: true
  // async fillEmail(email): Promise<void> {
  //   Parameter 'email' implicitly has an 'any' type
  // }
}


// -----------------------------------------------
// 4. REAL MISTAKE STRICT CATCHES BEFORE TEST RUNS
// -----------------------------------------------

interface Credentials {
  email: string;
  password: string;
}

const user: Credentials = {
  email: 'test@wingify.com',
  password: 'Test@1234'
};

// ❌ Strict catches this immediately — no runtime surprise
// console.log(user.passowrd);
// Property 'passowrd' does not exist on type 'Credentials'
// Did you mean 'password'?

// ✅ Correct
console.log(user.password);