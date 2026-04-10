# M00 Quick Reference Cheatsheet

## Terminal Commands Cheatsheet

### Project Setup
\\\ash
npm init -y                                      # Initialize project
npm install --save-dev @playwright/test          # Install Playwright
npx playwright install                           # Download browsers
npm test                                         # Run tests
npm run test:headed                              # Run with browser visible
\\\

---

## TypeScript Config Quick Copy

### Minimal \	sconfig.json\
\\\json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
\\\

---

## Playwright Config Snippets

### Basic Config
\\\	ypescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'https://example.com',
  },
});
\\\

### With Parallel Execution
\\\	ypescript
export default defineConfig({
  fullyParallel: true,
  workers: 4,  // Run 4 tests in parallel
});
\\\

### With Reporter
\\\	ypescript
export default defineConfig({
  reporter: 'html',  // Generates test report
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
\\\

---

## Folder Structure Template

\\\
my-project/
├── src/
│   ├── pages/
│   │   └── LoginPage.ts
│   └── utils/
│       └── helpers.ts
├── tests/
│   └── login.spec.ts
├── playwright.config.ts
├── tsconfig.json
└── package.json
\\\

---

## Page Object Model Template

### Quick POM Class
\\\	ypescript
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Locators
  readonly emailInput = 'input[type=\"email\"]';
  readonly passwordInput = 'input[type=\"password\"]';
  readonly loginButton = 'button:has-text(\"Login\")';

  // Methods
  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}
\\\

---

## Test File Template

### Quick Test Structure
\\\	ypescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully', async () => {
    await loginPage.login('user@example.com', 'password123');
    // Add assertions here
  });
});
\\\

---

## Common npm Scripts

Add to \package.json\:
\\\json
"scripts": {
  "test": "playwright test",
  "test:headed": "playwright test --headed",
  "test:debug": "playwright test --debug",
  "test:chrome": "playwright test --project=chromium",
  "test:report": "playwright show-report"
}
\\\

Run with:
\\\ash
npm test                 # Run all tests
npm run test:headed      # Run with browser visible
npm run test:debug       # Debug mode
npm run test:report      # View HTML report
\\\

---

## import/export Cheatsheet

### Named Export (Page Object)
\\\	ypescript
// pages/LoginPage.ts
export class LoginPage {
  // ...
}

// tests/login.spec.ts
import { LoginPage } from '../pages/LoginPage';
\\\

### Default Export
\\\	ypescript
// config.ts
export default {
  API_URL: 'https://api.example.com'
};

// test.ts
import config from '../config';
\\\

---

## JSON for Test Data

### Test Data Format
\\\json
{
  "users": [
    {
      "email": "user1@example.com",
      "password": "pass123"
    },
    {
      "email": "user2@example.com",
      "password": "pass456"
    }
  ]
}
\\\

### Load in Test
\\\	ypescript
import testData from '../data/users.json';

test('login with user1', async () => {
  const user = testData.users[0];
  await loginPage.login(user.email, user.password);
});
\\\

---

## baseURL Usage

### In Config
\\\	ypescript
export default defineConfig({
  use: {
    baseURL: 'https://app.example.com',
  },
});
\\\

### In Test
\\\	ypescript
// ✅ Uses baseURL + '/login' = 'https://app.example.com/login'
await page.goto('/login');

// ✅ Relative links work too
await page.goto('/dashboard');

// ✅ Full URLs work (ignores baseURL)
await page.goto('https://other-site.com');
\\\

---

## File Naming Conventions

| File Type | Pattern | Example |
|-----------|---------|---------|
| Test file | \*.spec.ts\ or \*.test.ts\ | \login.spec.ts\ |
| Page Object | \Page.ts\ | \LoginPage.ts\ |
| Utils file | \*.ts\ | \helpers.ts\ |
| Config | \*.config.ts\ | \playwright.config.ts\ |
| Data file | \*.json\ | \	estUsers.json\ |

---

## Version Check Commands

\\\ash
node --version              # Node.js version (should be v18+)
npm --version               # npm version
npx playwright --version    # Playwright version
npx tsc --version          # TypeScript version
\\\

---

## Timeout Defaults (in milliseconds)

| Setting | Default | In Config |
|---------|---------|-----------|
| Test timeout | 30000ms (30s) | \	imeout: 30000\ |
| Expect timeout | 5000ms (5s) | \expect: { timeout: 5000 }\ |
| Navigation timeout | 30000ms (30s) | \
avigationTimeout: 30000\ |

---

## One-Liner Installation

\\\ash
mkdir pw-project && cd pw-project && npm init -y && npm install --save-dev @playwright/test @types/node && npx playwright install
\\\

---

## Strict Mode + No Errors

\\\	ypescript
// ✅ Always type your variables
const user: string = 'john@example.com';
const age: number = 25;
const active: boolean = true;

// ✅ Handle null possibility
const title: string | null = await page.title();

// ✅ Use non-null assertion if sure
const element = (await page.button)!;

// ❌ Avoid 'any' at all costs
const data: any = {};  // Don't do this!
\\`\

---

## Print This!

Save as PDF or bookmark for quick access during development.

