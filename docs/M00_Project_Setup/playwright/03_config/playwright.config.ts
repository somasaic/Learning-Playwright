// ============================================
// playwright.config.ts — The Brain
// Location: playwright/03_config/playwright.config.ts
// This file controls HOW the entire suite runs
// ============================================

import { defineConfig, devices } from '@playwright/test';

// defineConfig() — wrapper that gives TypeScript autocomplete
// on every config option. Without it, no type checking on config.

export default defineConfig({

  // -----------------------------------------------
  // WHERE to find test files
  // -----------------------------------------------
  testDir: './tests',
  // If testDir is wrong → Playwright finds 0 tests
  // Runs nothing, exits with green — FALSE PASS
  // Debug: npx playwright test --list

  // -----------------------------------------------
  // HOW to run tests
  // -----------------------------------------------
  fullyParallel: true,
  // All tests in all files run at the same time
  // Requires tests to be independent — no shared state

  forbidOnly: !!process.env.CI,
  // test.only() is a debugging tool — blocks all other tests
  // In CI: if someone commits test.only() → build FAILS
  // Protects CI from accidental partial runs
  // !! converts string to boolean

  // -----------------------------------------------
  // RETRY logic — different locally vs CI
  // -----------------------------------------------
  retries: process.env.CI ? 1 : 0,
  // process.env.CI is automatically set to "true" by GitHub Actions
  // Locally: CI is undefined → retries = 0 (see failures immediately)
  // In CI: CI = "true" → retries = 1 (handle network flakiness)

  // -----------------------------------------------
  // WORKERS — parallel execution control
  // -----------------------------------------------
  workers: process.env.CI ? 1 : undefined,
  // Locally: undefined = use all CPU cores (fast)
  // In CI: 1 worker = run tests sequentially (stable on shared runners)
  // GitHub Actions free tier has limited CPU — parallel can cause flakiness

  // -----------------------------------------------
  // REPORTING
  // -----------------------------------------------
  reporter: 'html',
  // Generates playwright-report/ folder after every run
  // Open with: npx playwright show-report
  // CI: upload as artifact so team can download it

  // -----------------------------------------------
  // SHARED settings for ALL tests
  // -----------------------------------------------
  use: {
    baseURL: 'https://app.vwo.com',
    // Tests use goto('/#/login') — config adds the base
    // Change staging/prod here → ALL tests update
    // NEVER end with trailing slash: 'https://app.vwo.com/'
    // Because goto('/#/login') would become 'https://app.vwo.com//#/login'

    screenshot: 'only-on-failure',
    // Captures screenshot when a test fails
    // Stored in test-results/ folder
    // Visible in HTML report

    trace: 'on-first-retry',
    // Records a trace file on the first retry
    // Open with: npx playwright show-trace trace.zip
    // Shows: timeline, screenshots, network, console logs

    // -----------------------------------------------
    // TIMEOUT settings
    // -----------------------------------------------
    actionTimeout: 15000,
    // Max time for a single action: click, fill, hover
    // VWO login server response = 13-15 seconds
    // Must be higher than the slowest server response

    navigationTimeout: 30000,
    // Max time for page.goto() to complete
    // 30 seconds covers slow network in CI
  },

  // -----------------------------------------------
  // CROSS-BROWSER projects
  // -----------------------------------------------
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
      // ...spread copies all Chrome device settings:
      // viewport, userAgent, browserName, etc.
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
  ],
  // 6 tests × 3 browsers = 18 total test runs
  // All use the SAME test code — no duplication

});