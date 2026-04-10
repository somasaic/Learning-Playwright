// ============================================
// CONFIG OBJECT — mirrors playwright.config.ts
// Shows how config is just a nested object
// ============================================

const projectConfig = {
  baseURL: 'https://app.vwo.com',
  timeout: 30000,
  browsers: ['chromium', 'firefox', 'webkit'],
  use: {
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    headless: true
  },
  retries: {
    local: 0,
    ci: 1
  }
};

// Accessing nested object values
console.log(projectConfig.baseURL);           // https://app.vwo.com
console.log(projectConfig.use.screenshot);    // only-on-failure
console.log(projectConfig.retries.ci);        // 1
console.log(projectConfig.browsers[0]);       // chromium

module.exports = { projectConfig };