# M00 Hands-On Lab Exercise

## Objective
Build your first Playwright + TypeScript project from zero to running your first test configuration.

**Time:** 30-45 minutes

---

## Prerequisites
- Node.js installed (v18+)
- VS Code or any text editor
- Terminal/PowerShell access

---

## Lab Steps

### Step 1: Create Project Directory
\\\ash
mkdir my-playwright-project
cd my-playwright-project
\\\

### Step 2: Initialize npm
\\\ash
npm init -y
\\\

**What happens:**
- Creates package.json with default settings
- Ready for dependency installation

---

### Step 3: Install Playwright + TypeScript
\\\ash
npm install --save-dev @playwright/test playwright typescript @types/node
\\\

**Verify:**
Open package.json, you should see:
\\\json
"devDependencies": {
  "@playwright/test": "^1.x.x",
  "playwright": "^1.x.x",
  "typescript": "^5.x.x",
  "@types/node": "^20.x.x"
}
\\\

---

### Step 4: Create tsconfig.json
Create file: \	sconfig.json\

\\\json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
\\\

**Check:** Run \	sc --version\ — should show TypeScript version

---

### Step 5: Create playwright.config.ts
Create file: \playwright.config.ts\

\\\	ypescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  workers: 2,
  reporter: 'html',
  use: {
    baseURL: 'https://example.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
\\\

**Check:** Run \
px playwright --version\ — should show Playwright version

---

### Step 6: Create Folder Structure
\\\ash
mkdir tests
mkdir src/pages
mkdir src/utils
\\\

---

### Step 7: Create First Page Object
Create file: \src/pages/ExamplePage.ts\

\\\	ypescript
import { Page } from '@playwright/test';

export class ExamplePage {
  private page: Page;
  readonly searchInput = 'input[placeholder=\"Search\"]';
  readonly searchButton = 'button:has-text(\"Search\")';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async search(term: string) {
    await this.page.fill(this.searchInput, term);
    await this.page.click(this.searchButton);
  }
}
\\\

---

### Step 8: Create First Test
Create file: \	ests/example.spec.ts\

\\\	ypescript
import { test, expect } from '@playwright/test';
import { ExamplePage } from '../src/pages/ExamplePage';

test.describe('Example Site', () => {
  let page: any;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
  });

  test('should load home page', async () => {
    const examplePage = new ExamplePage(page);
    await examplePage.goto();
    await expect(page).toHaveTitle(/Example/);
  });
});
\\\

---

### Step 9: Update package.json Scripts
Add to package.json:

\\\json
"scripts": {
  "test": "playwright test",
  "test:headed": "playwright test --headed",
  "test:debug": "playwright test --debug"
}
\\\

---

### Step 10: Install Browsers
\\\ash
npx playwright install
\\\

This downloads Chromium, Firefox, WebKit locally.

---

### Step 11: Run Your First Test
\\\ash
npm test
\\\

**Expected output:**
\\\
✓ [chromium] › example.spec.ts › Example Site › should load home page
\\\

---

## Lab Verification Checklist

- [ ] package.json created with Playwright dependencies
- [ ] tsconfig.json created with strict mode enabled
- [ ] playwright.config.ts created with baseURL configured
- [ ] Folder structure created (tests/, src/pages/, src/utils/)
- [ ] ExamplePage.ts created as POM class
- [ ] example.spec.ts created with test case
- [ ] npm test runs successfully
- [ ] Browser downloads complete

---

## What You Just Built

| Component | Purpose |
|-----------|---------|
| **tsconfig.json** | TypeScript compilation rules |
| **playwright.config.ts** | Test runner configuration |
| **ExamplePage.ts** | Page Object Model pattern |
| **example.spec.ts** | Test specification |

This is the **foundation** that every SDET project uses.

---

## Next Steps

1. Modify baseURL to point to your test target (e.g., VWO login page)
2. Add more locators to ExamplePage.ts
3. Create additional test cases
4. Move to **M01 — Selectors + POM** for deeper POM design

---

## Troubleshooting During Lab

| Issue | Solution |
|-------|----------|
| npm install fails | Update Node.js to v18+ |
| TypeScript errors | Run \
px tsc --version\ to verify install |
| Tests not found | Check folder structure matches playwright.config.ts testDir |
| Browser not found | Run \
px playwright install\ again |

