# CONCEPT — playwright.config.ts

---

## 1. WHAT IS THIS

- The single file that controls HOW your entire test suite runs
- `baseURL`, `browsers`, `retries`, `reporter`, `timeout` all live here
- `defineConfig()` wrapper gives TypeScript type checking on every option
- Playwright auto-discovers this file — no import needed in test files

---

## 2. WHY THIS IS USED

- Without it: every test hardcodes `https://app.vwo.com/#/login`
- With it: tests say `goto('/#/login')` — config fills in the base
- Change environment once here → all 50 tests update automatically
- Every test plan decision has a direct line in this file:

| Test Plan Decision | Config Line |
|-------------------|-------------|
| Test on 3 browsers | `projects: [chromium, firefox, webkit]` |
| Network flakiness risk | `retries: process.env.CI ? 1 : 0` |
| HTML report deliverable | `reporter: 'html'` |
| Screenshot on failure | `screenshot: 'only-on-failure'` |
| VWO takes 13-15s | `actionTimeout: 15000` |

---

## 3. WHERE IT IS USED

- Must sit at the **project root** — same level as `package.json`
- Playwright auto-discovers it when you run `npx playwright test`
- If placed inside a subfolder → Playwright cannot find it
- Override location: `npx playwright test --config=path/to/config.ts`

---

## 4. HOW IT WORKS

### Every setting explained

```typescript
export default defineConfig({

  testDir: './tests',
  // WHERE spec files live
  // Wrong value = 0 tests found, false green pass

  fullyParallel: true,
  // All tests run simultaneously
  // Requires test independence — no shared state between tests

  forbidOnly: !!process.env.CI,
  // Blocks test.only() commits reaching CI
  // Saves team from accidentally running 1 test in pipeline

  retries: process.env.CI ? 1 : 0,
  // process.env.CI = set by GitHub Actions automatically
  // Local = 0 (see failures immediately)
  // CI = 1 (handle network/timing flakiness)

  workers: process.env.CI ? 1 : undefined,
  // Local = all CPU cores (fast)
  // CI = 1 (stable on shared runners)

  reporter: 'html',

  use: {
    baseURL: 'https://app.vwo.com',   // NO trailing slash
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 15000,             // per action: click, fill
    navigationTimeout: 30000,         // per page.goto()
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
  ],
});
```

### What `...devices[spread]` does

```typescript
// devices['Desktop Chrome'] is an object that contains:
// {
//   browserName: 'chromium',
//   viewport: { width: 1280, height: 720 },
//   userAgent: 'Mozilla/5.0 ...',
//   deviceScaleFactor: 1,
//   isMobile: false,
//   hasTouch: false
// }

// ...spread copies ALL of those settings into your project
{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }
// Same as writing out every setting manually — but in one line
```

### Three timeout levels

```typescript
// Level 1 — whole test (default 30s)
timeout: 30000

// Level 2 — single action: click, fill, hover (default 10s)
actionTimeout: 15000    // VWO needs 15s for server response

// Level 3 — page.goto() navigation (default 30s)
navigationTimeout: 30000

// Per-test override (highest priority)
test('slow test', async ({ page }) => {
  test.setTimeout(60000);  // this test gets 60s
});
```

---

## 5. REAL PROJECT EXAMPLE

### STLC → Config traceability

Test Plan Risk: "Network flakiness in CI"
→ retries: process.env.CI ? 1 : 0
Test Plan Scope: "3 browsers in scope"
→ projects: [chromium, firefox, webkit]
Test Plan Exit Criteria: "HTML report generated"
→ reporter: 'html'
Test Plan Exit Criteria: "Screenshots on failure"
→ screenshot: 'only-on-failure'
REQ-12: "Page loads within timeout"
→ actionTimeout: 15000, navigationTimeout: 30000

### GitHub Actions reads this config

```yaml
- run: npx playwright test
# Playwright finds playwright.config.ts at root
# Reads: testDir, projects, retries, reporter
# process.env.CI = true here → retries = 1, workers = 1
```

---

## 6. WHAT CAN GO WRONG

| Mistake | What breaks | Fix |
|---------|------------|-----|
| Trailing slash in baseURL | `goto('/#/login')` = double slash URL | Remove trailing slash |
| Wrong `testDir` | 0 tests found, false green | Run `npx playwright test --list` |
| `fullyParallel` with shared state | Race conditions, flaky tests | Make each test fully independent |
| Missing `workers: 1` in CI | Parallel tests on weak runner = flaky | Set `workers: process.env.CI ? 1 : undefined` |
| `test.only()` committed | CI runs 1 test only — team doesn't notice | `forbidOnly: !!process.env.CI` catches this |
| `actionTimeout` too low for VWO | TC-03 fails — server takes 13-15s | Set `actionTimeout: 15000` minimum |
| Config file not at root | Playwright cannot find it | Move to same level as `package.json` |

---

## 7. HOW TO DEBUG

```bash
# List all discovered tests — if empty, testDir is wrong
npx playwright test --list

# Run with explicit config path
npx playwright test --config=playwright.config.ts

# Run only one browser
npx playwright test --project=chromium

# Run only tests matching a name pattern
npx playwright test --grep "TC-01"

# Run in headed mode to see browser
npx playwright test --headed

# See what config values are active
npx playwright test --list --reporter=line
```

---

## 8. INTERVIEW ANSWER

"playwright.config.ts is the central config for the entire
suite — it controls browsers, timeouts, retries, and reporting.
I set `baseURL` so tests use relative paths — changing the
environment requires editing one line. `retries` uses
`process.env.CI` to behave differently locally versus in
GitHub Actions — 0 locally for immediate feedback, 1 in CI
for network flakiness. `workers: 1` in CI prevents race
conditions on shared runners. `forbidOnly` blocks accidental
`test.only()` commits from reaching CI and running only one
test. `actionTimeout: 15000` covers VWO's 13–15 second server
response time. Every decision in the test plan traces directly
to a line in this file."

---

## Connection Forward

playwright.config.ts
↓
M05_CrossBrowser → projects array expands to 5 browsers
M06_Reporting   → reporter changes to ['html', 'list']
M07_CI_CD       → process.env.CI drives retries + workers
M02_Tests       → baseURL used in every page.goto() call


## How to Run This Config
# From repo root where package.json lives
npx playwright test --list
# Shows all tests discovered using this config

npx playwright test --project=chromium
# Runs only chromium browser using baseURL from config