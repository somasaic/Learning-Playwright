# M00 Troubleshooting Guide

## Common Issues & Solutions

---

## 1. npm Install Fails

### Error
\\\
npm error! code ERESOLVE
npm error! ERESOLVE unable to resolve dependency tree
\\\

### Solutions

**Try 1:** Clear npm cache
\\\ash
npm cache clean --force
npm install
\\\

**Try 2:** Use legacy peer deps flag
\\\ash
npm install --legacy-peer-deps
\\\

**Try 3:** Update npm & Node.js
\\\ash
npm install -g npm@latest
# Verify Node.js is v18+
node --version
\\\

---

## 2. TypeScript Compilation Errors

### Error: Cannot find module '@playwright/test'
\\\
TS1259: Module can only be default-imported using 'esModuleInterop'
\\\

### Solution
Update \	sconfig.json\:
\\\json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "module": "commonjs",
    "strict": true
  }
}
\\\

---

### Error: Property 'xxx' does not exist on type 'Page'
\\\
TS2339: Property 'fill' does not exist on type 'Page'
\\\

### Solution
Make sure Playwright types are installed:
\\\ash
npm install --save-dev @types/node
npm install --save-dev @playwright/test
\\\

Then check import in your file:
\\\	ypescript
import { Page, test, expect } from '@playwright/test';  // ✅ Correct
// NOT: import { Page } from 'playwright';              // ❌ Wrong (missing types)
\\\

---

## 3. Tests Not Found / Not Running

### Error
\\\
0 tests found
\\\

### Check 1: Verify testDir in playwright.config.ts
\\\	ypescript
export default defineConfig({
  testDir: './tests',  // ← This path must exist
});
\\\

### Check 2: File naming convention
Playwright looks for files matching:
- \*.spec.ts\
- \*.spec.js\
- \*.test.ts\
- \*.test.js\

**Correct:**
\\\
tests/
  ├── login.spec.ts     ✅
  ├── dashboard.spec.ts ✅
\\\

**Wrong:**
\\\
tests/
  ├── login.ts          ❌ (missing .spec)
\\\

---

## 4. Browsers Not Found

### Error
\\\
browserType.launch: Browser not found at /path/to/chrome
HINT: Try installing missing browsers with 'npx playwright install'
\\\

### Solution
\\\ash
npx playwright install

# Or install specific browser
npx playwright install chromium
\\\

### Verify Installation
\\\ash
npx playwright install-deps
\\\

---

## 5. Tests Timeout

### Error
\\\
Timeout 30000ms exceeded while running a hook
\\\

### Causes & Fixes

**Cause 1: Page takes too long to load**
\\\	ypescript
// Increase timeout
test('should load page', async ({ page }) => {
  page.setDefaultTimeout(60000);  // 60 seconds
  await page.goto('https://example.com');
});
\\\

**Cause 2: Element takes time to appear**
\\\	ypescript
// Increase wait time
const element = await page.waitForSelector('button', { timeout: 10000 });
\\°\

**Cause 3: Network is slow**
Update \playwright.config.ts\:
\\\	ypescript
export default defineConfig({
  timeout: 60000,  // 60 seconds per test
  expect: { timeout: 10000 },  // 10 seconds per assertion
});
\\\

---

## 6. baseURL Not Working

### Error
\\\
Navigation to "{{baseURL}}/login" failed
\\\

### Solution

**Check 1: baseURL syntax**
\\\	ypescript
// playwright.config.ts
export default defineConfig({
  use: {
    baseURL: 'https://example.com',  // ✅ Include https://
  },
});
\\\

**Check 2: Use relative paths in tests**
\\\	ypescript
// ✅ Correct
await page.goto('/login');  // Uses baseURL + '/login'

// ❌ Wrong
await page.goto('login');   // Doesn't use baseURL
\\\

---

## 7. Port Already in Use (If Running Local Server)

### Error
\\\
Error: listen EADDRINUSE: address already in use :::3000
\\\

### Solution

**Kill process on port 3000:**

**Windows (PowerShell):**
\\\powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
\\\

**Mac/Linux:**
\\\ash
lsof -i :3000
kill -9 <PID>
\\\

---

## 8. Strict Mode Errors

### Error
\\\
TS2322: Type 'string | null' is not assignable to type 'string'
\\\

### Explanation
\strictNullChecks\ is enabled. Handle nullable types:

\\\	ypescript
// ❌ Wrong
const title: string = page.title();

// ✅ Correct
const title: string | null = page.title();

// ✅ Or use non-null assertion
const title = (await page.title())!;
\\\

---

## 9. GitHub Pages Not Deploying

### Issue
\\\
GitHub Pages workflow failed
\\\

### Solution

**Check 1: Workflow file exists**
\\\
.github/workflows/pages.yml
\\\

**Check 2: GitHub Pages settings**
1. Go to repo Settings
2. Pages → Source
3. Select: "GitHub Actions"

**Check 3: Workflow permissions**
Settings → Actions → General → Workflow permissions
- Select: "Read and write permissions"

---

## 10. Import Statement Errors

### Error
\\\
Cannot find module './pages/LoginPage'
\\\

### Solution

**Check 1: File path is correct**
\\\
src/
  ├── pages/
      ├── LoginPage.ts   ✅
\\\

**Check 2: Import uses correct path**
\\\	ypescript
// ✅ Correct
import { LoginPage } from '../pages/LoginPage';

// ❌ Wrong
import { LoginPage } from '../pages/LoginPage.js';  // Don't include .js
\\\

**Check 3: tsconfig.json has moduleResolution**
\\\json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
\\\

---

## Quick Troubleshooting Checklist

- [ ] Node.js version is v18+: \
ode --version\
- [ ] npm cache cleared: \
pm cache clean --force\
- [ ] Dependencies installed: \
pm list\
- [ ] Browsers installed: \
px playwright install\
- [ ] tsconfig.json has correct settings
- [ ] playwright.config.ts testDir matches folder structure
- [ ] Test files named *.spec.ts or *.test.ts
- [ ] No EADDRINUSE errors (port conflicts)
- [ ] GitHub Pages workflow permissions set to 'read and write'

---

## Still Stuck?

Check these resources:
1. [Playwright Documentation](https://playwright.dev)
2. [Playwright GitHub Issues](https://github.com/microsoft/playwright/issues)
3. [TypeScript Handbook](https://www.typescriptlang.org/docs/)

