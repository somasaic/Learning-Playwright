CONCEPT 4: npm install @playwright/test + npx playwright install

1. WHAT IS THIS

Two separate steps that are both required

- npm install → downloads the Playwright library (JavaScript code)
- npx playwright install → downloads actual browser binaries (Chromium, Firefox, WebKit)

2. WHY THIS IS USED

- The library alone can't run tests — it needs real browsers to control
- This is why CI pipelines have BOTH steps

3. WHERE IT IS USED

- Once during project setup
- Every time in GitHub Actions CI (fresh machine needs both)

4. HOW IT WORKS

- bash

# Step 1: Install Playwright test runner + library

npm install @playwright/test

# Step 2: Download browser binaries

npx playwright install

# OR use the quick scaffold (does everything):

npm init playwright@latest

5. REAL PROJECT EXAMPLE

- GitHub Actions workflow:

yaml:-
run: npm ci # installs library from lockfile
run: npx playwright install # downloads browsers on CI machine
run: npx playwright test # runs tests

If you skip npx playwright install → error: "Executable doesn't exist at path"

6. WHAT CAN GO WRONG

- Running npm install but forgetting npx playwright install → browser not found error
- Using npm install in CI instead of npm ci → slower, ignores lockfile

7. HOW TO DEBUG

- bash
  npx playwright install --dry-run # shows what would be installed
  npx playwright --version # confirms library version

8. INTERVIEW ANSWER

"Playwright needs two installations — npm install @playwright/test gets the library, and npx playwright install downloads the actual browser binaries. In CI, both steps are required on every fresh machine. Using npm ci instead of npm install in CI is faster and stricter — it installs exactly from the lockfile."
