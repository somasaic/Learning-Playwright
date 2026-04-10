// ============================================
// TIMEOUT CONFIG — All 4 timeout levels
// Location: playwright/04_baseURL_timeout/playwright.config.ts
// ============================================

// NOTE: Red error "Cannot find name 'defineConfig'" is because
// @playwright/test is not installed at repo root yet.
// Fix: npm install @playwright/test (run at repo root)
// This file is a REFERENCE example — errors are expected here

export default {

  // -----------------------------------------------
  // LEVEL 1: TEST timeout
  // The entire test must finish within this time
  // Default: 30000ms = 30 seconds
  // -----------------------------------------------
  timeout: 30000,

  // -----------------------------------------------
  // LEVEL 2: EXPECT timeout
  // expect(locator).toBeVisible() waits this long
  // Default: 5000ms = 5 seconds
  // This is SEPARATE from actionTimeout
  // -----------------------------------------------
  expect: {
    timeout: 5000
  },

  use: {

    // -----------------------------------------------
    // LEVEL 3: NAVIGATION timeout
    // page.goto() must complete within this time
    // Default: 30000ms = 30 seconds
    // -----------------------------------------------
    navigationTimeout: 30000,

    // -----------------------------------------------
    // LEVEL 4: ACTION timeout
    // click(), fill(), hover() must complete within this time
    // Default: 10000ms = 10 seconds
    // VWO server response = 13-15 seconds
    // MUST be higher than slowest server response
    // -----------------------------------------------
    actionTimeout: 15000,
  }

};


// -----------------------------------------------
// TIMEOUT HIERARCHY — which setting wins
// -----------------------------------------------

// test.setTimeout(60000)        ← HIGHEST — per test override
//         ↓
// config timeout: 30000         ← global test timeout
//         ↓
// config actionTimeout: 15000   ← per action (click, fill)
// config navigationTimeout: 30000  ← per page.goto()
// config expect.timeout: 5000   ← per expect() assertion
//         ↓
// Playwright built-in defaults  ← LOWEST — if nothing set


// -----------------------------------------------
// REAL VWO TIMING — why these values matter
// -----------------------------------------------

// TC-05 (empty form submit):     4.9s  — client-side validation
// TC-03 (invalid credentials):   13-15s — server round-trip
// TC-01 (page load smoke):       8-10s — DOM fully rendered

// actionTimeout: 15000  covers TC-03 server response
// navigationTimeout: 30000 covers initial page load
// timeout: 30000 covers full test execution

// If actionTimeout was 10000 (default):
// TC-03 would FAIL — server takes 13s, timeout fires at 10s
// This is WHY you must tune actionTimeout for your specific app


// -----------------------------------------------
// PER-TEST OVERRIDE — when one test needs more time
// -----------------------------------------------

// test('slow dashboard load', async ({ page }) => {
//   test.setTimeout(60000);    // this test gets 60s
//   // global timeout: 30s is ignored for this test only
// });


// -----------------------------------------------
// WHAT THE ERROR MESSAGE LOOKS LIKE
// -----------------------------------------------

// Action timeout fired:
// "locator.click: Timeout 15000ms exceeded.
//  waiting for locator('button[name="Sign in"]') to be visible"
// FIX → increase actionTimeout

// Navigation timeout fired:
// "page.goto: Timeout 30000ms exceeded
//  navigating to 'https://app.vwo.com/#/login'"
// FIX → increase navigationTimeout

// Expect timeout fired:
// "expect(received).toBeVisible()
//  Timeout 5000ms exceeded"
// FIX → increase expect.timeout

// Test timeout fired:
// "Test timeout of 30000ms exceeded"
// FIX → increase timeout OR test.setTimeout()