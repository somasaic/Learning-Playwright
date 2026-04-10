# CONCEPT — timeout config

---

## 1. WHAT IS THIS

- Timeout = how long Playwright waits before declaring a step FAILED
- There are FOUR separate timeout types — not two
- Each fires independently — knowing which one fired tells you exactly what to fix
- All set globally in `playwright.config.ts`, overridable per test

---

## 2. WHY THIS IS USED

- Without tuning: default `actionTimeout` is 10s — VWO takes 13-15s — TC-03 FAILS
- With tuning: tests pass reliably because timeouts match real app behaviour
- Two failure modes from wrong timeouts:
  - Too LOW → false failures — test fails even though app is working
  - Too HIGH → hanging CI — a broken test blocks pipeline for 5+ minutes

---

## 3. WHERE IT IS USED

| Setting | Where it applies | Default |
|---------|-----------------|---------|
| `timeout` | Entire test block | 30000ms |
| `expect.timeout` | `expect(locator).toBeVisible()` | 5000ms |
| `actionTimeout` | `click()`, `fill()`, `hover()` | 10000ms |
| `navigationTimeout` | `page.goto()` | 30000ms |
| `test.setTimeout()` | Single specific test | overrides `timeout` |

---

## 4. HOW IT WORKS

### All 4 timeout levels

```typescript
export default defineConfig({

  // LEVEL 1 — whole test must finish in this time
  timeout: 30000,

  // LEVEL 2 — expect() assertion wait time
  expect: {
    timeout: 5000
    // expect(loginButton).toBeVisible() waits 5s
    // If element not visible in 5s → assertion FAILS
  },

  use: {
    // LEVEL 3 — page.goto() must complete in this time
    navigationTimeout: 30000,

    // LEVEL 4 — click(), fill(), hover() must complete
    actionTimeout: 15000,
    // VWO server response = 13-15s
    // Default 10s would FAIL on TC-03
  }
});
```

### Timeout hierarchy — which wins

test.setTimeout(60000)          ← HIGHEST — overrides everything for that test
↓
config: timeout: 30000          ← global test ceiling
↓
config: actionTimeout: 15000    ← per action (click, fill, hover)
config: navigationTimeout: 30000  ← per page.goto()
config: expect.timeout: 5000    ← per expect() assertion
↓
Playwright defaults              ← LOWEST — only if nothing set

### VWO real timing — why values matter
TC-01 (page load smoke):       8-10s  → navigationTimeout: 30000 covers this
TC-03 (invalid credentials):   13-15s → actionTimeout: 15000 covers this
TC-05 (empty form submit):      4.9s  → client-side only, no server call

The 4.9s vs 13-15s difference PROVES TC-05 never reaches the server.
This timing insight is interview-worthy — mention it.

---

## 5. REAL PROJECT EXAMPLE

### Config tuned for VWO

```typescript
use: {
  actionTimeout: 15000,
  // TC-03 clicks Sign In → VWO server responds in 13-15s
  // Default 10s fires too early → false failure
  // 15s covers the response with 2s buffer

  navigationTimeout: 30000,
  // page.goto('/#/login') = 8-10s on average
  // 30s covers slow network in CI

  baseURL: 'https://app.vwo.com',
  // goto('/#/login') = goto('https://app.vwo.com/#/login')
}
```

### Per-test override

```typescript
test('TC-02: slow server response test', async ({ page }) => {
  test.setTimeout(45000);
  // This specific test gets 45s
  // Other tests still use global 30s
  await loginPage.login('test@wingify.com', 'Test@1234');
  await expect(loginPage.errorMessage).toBeVisible();
});
```

---

## 6. WHAT CAN GO WRONG

| Mistake | Symptom | Fix |
|---------|---------|-----|
| `actionTimeout` too low (10s default) | TC-03 fails — server takes 13s | Set `actionTimeout: 15000` |
| `expect.timeout` too low | Assertion fails before element appears | Increase `expect.timeout` |
| `timeout` too high | Broken test hangs CI for minutes | Keep `timeout: 30000` max |
| `timeout` too low | Fast test passes, slow test times out | Use `test.setTimeout()` for slow tests |
| Fixing wrong timeout | Problem persists — you increased `timeout` but issue is `actionTimeout` | Read error message carefully |
| Not knowing which timeout fired | Random fixes that don't work | Error message always names the timeout |

---

## 7. HOW TO DEBUG

### Read the error message — it tells you exactly which timeout fired

```bash
# Action timeout
"locator.fill: Timeout 15000ms exceeded"
# → increase actionTimeout in config

# Navigation timeout
"page.goto: Timeout 30000ms exceeded"
# → increase navigationTimeout in config

# Expect timeout
"expect(received).toBeVisible() Timeout 5000ms exceeded"
# → increase expect.timeout OR element is genuinely missing

# Test timeout
"Test timeout of 30000ms exceeded"
# → increase timeout OR use test.setTimeout() for that test
```

```bash
# Override timeout globally for one run (debugging only)
npx playwright test --timeout=60000

# Run specific test to isolate timeout issue
npx playwright test --grep "TC-03"

# Run headed to watch where it gets stuck
npx playwright test --headed --grep "TC-03"
```

---

## 8. INTERVIEW ANSWER

"Playwright has four timeout levels — test timeout for the
whole test, expect timeout for assertions, action timeout for
interactions like click and fill, and navigation timeout for
page.goto. I set these in `playwright.config.ts` globally.

For VWO specifically, the server takes 13–15 seconds to
respond to invalid credentials — TC-03. The default
`actionTimeout` is 10 seconds which fires too early and
causes a false failure. Setting `actionTimeout: 15000`
fixes this.

The key debugging skill is reading the error message — it
always names which timeout fired. Increasing the wrong
timeout wastes time and doesn't fix the problem. TC-05
runs in 4.9 seconds versus TC-03 at 13-15 seconds — that
timing difference itself proves TC-05 uses client-side
validation while TC-03 hits the server."

---

## Connection Forward

timeout config knowledge
↓
M06_Reporting_Retry
→ retries: 1 gives the test a second attempt before timeout is final
→ trace: 'on-first-retry' records what happened in the timed-out attempt
timeout config knowledge
↓
M07_GitHub_Actions
→ CI runners are slower than local
→ actionTimeout must account for CI network latency
→ timeout-minutes: 60 in yml is the JOB timeout — different from test timeout

## One Line Summary to Remember

timeout     = whole test ceiling
actionTimeout   = per click/fill
navigationTimeout = per page.goto
expect.timeout  = per expect()

Error message always tells you which one fired.
Fix that one. Not the others.