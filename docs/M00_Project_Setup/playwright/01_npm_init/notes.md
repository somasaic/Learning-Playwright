# CONCEPT — npm init + package.json

---

## 1. WHAT IS THIS

- `npm init` creates `package.json` — the identity card of your Node.js project
- It records: project name, version, scripts, and dependencies
- `package.json` = what your project needs
- `package-lock.json` = exact versions that are installed (auto-generated)
- These two files together = reproducible installs on any machine

---

## 2. WHY THIS IS USED

- Without `package.json` Node.js does not know this is a project
- Stores scripts so `npm test` runs your Playwright suite with one command
- Records dependencies so anyone who clones the repo gets the same versions
- CI pipeline reads it to know what commands to run
- `devDependencies` vs `dependencies`:
  - `devDependencies` — tools used only during development/testing (Playwright goes here)
  - `dependencies` — packages needed in production (your app code)
  - Playwright is always `devDependencies` — it is a test tool not production code

---

## 3. WHERE IT IS USED

| Location         | What reads it  | Purpose                                        |
| ---------------- | -------------- | ---------------------------------------------- |
| Project root     | Node.js        | Identifies this as a Node project              |
| CI pipeline      | GitHub Actions | Reads scripts to know how to run tests         |
| `npm ci`         | npm            | Installs exact versions from package-lock.json |
| `npm test`       | npm            | Runs the "test" script value                   |
| `npm run report` | npm            | Runs the "report" script value                 |

---

## 4. HOW IT WORKS

### Creating package.json

```bash
# Option 1 — manual init (asks questions)
npm init

# Option 2 — skip all questions, use defaults
npm init -y

# Option 3 — Playwright scaffold (does everything at once)
npm init playwright@latest
# This creates: package.json + playwright.config.ts + example tests + .github/workflows
```

### What `npm init -y` generates

```json
{
  "name": "folder-name-becomes-project-name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

The default `test` script does nothing useful.
You must replace it with `npx playwright test`.

### What you manually update it to

```json
{
  "name": "sdet-stlc-portfolio",
  "version": "1.0.0",
  "description": "Playwright SDET learning framework",
  "scripts": {
    "test": "npx playwright test",
    "test:headed": "npx playwright test --headed",
    "test:debug": "npx playwright test --debug",
    "test:chromium": "npx playwright test --project=chromium",
    "test:firefox": "npx playwright test --project=firefox",
    "report": "npx playwright show-report",
    "lint": "npx tsc --noEmit"
  },
  "devDependencies": {
    "@playwright/test": "^1.44.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### How scripts work

```bash
npm test                  # runs "test" script value
npm run test:headed       # runs "test:headed" script value
npm run report            # runs "report" script value
npm run lint              # runs type check — shows TS errors without running tests
```

### npm install vs npm ci — critical difference

```bash
# npm install — development use
# - reads package.json
# - resolves versions (may update package-lock.json)
# - slower

# npm ci — CI/CD use
# - reads package-LOCK.json (exact versions)
# - never updates lockfile
# - faster
# - fails if lockfile is missing or outdated
# - THIS is what GitHub Actions uses
```

### package-lock.json — why it exists

```bash
# package.json says:  "@playwright/test": "^1.44.0"
# ^ means: accept 1.44.0 OR any newer 1.x.x version

# Without lockfile — machine A installs 1.44.0, machine B installs 1.46.0
# Tests pass on A, fail on B — version mismatch

# With package-lock.json — both machines install exactly 1.44.0
# This is why you commit package-lock.json to the repo
```

---

## 5. REAL PROJECT EXAMPLE

### Full professional package.json for VWO project

```json
{
  "name": "sdet-stlc-portfolio",
  "version": "1.0.0",
  "description": "Playwright + TypeScript SDET portfolio — VWO login automation",
  "scripts": {
    "test": "npx playwright test",
    "test:headed": "npx playwright test --headed",
    "test:debug": "npx playwright test --debug",
    "test:chromium": "npx playwright test --project=chromium",
    "test:firefox": "npx playwright test --project=firefox",
    "report": "npx playwright show-report",
    "lint": "npx tsc --noEmit"
  },
  "devDependencies": {
    "@playwright/test": "^1.44.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### GitHub Actions reads this file directly

```yaml
# .github/workflows/playwright.yml
- run: npm ci # reads package-lock.json → installs exact versions
- run: npx playwright install # downloads browser binaries
- run: npm test # runs "test" script from package.json
```

If `package.json` is broken JSON → `npm ci` fails → no tests run → CI shows red.

---

## 6. WHAT CAN GO WRONG

| Mistake                            | What breaks                                    | Fix                                                 |
| ---------------------------------- | ---------------------------------------------- | --------------------------------------------------- |
| Running `npm init` in wrong folder | `package.json` created in wrong place          | Always check `pwd` before running                   |
| Forgetting to update test script   | `npm test` prints error and exits              | Replace default script with `npx playwright test`   |
| Using `npm install` in CI          | May change lockfile, slower, non-deterministic | Use `npm ci` in GitHub Actions always               |
| Not committing `package-lock.json` | CI installs different versions than local      | Always commit `package-lock.json` to git            |
| Trailing comma in `package.json`   | `npm ci` fails with JSON parse error           | Validate with `node -e "require('./package.json')"` |
| Wrong `node` version on CI         | Tests behave differently                       | Set `engines` field + use `actions/setup-node@v4`   |

---

## 7. HOW TO DEBUG

```bash
# Check you are in the right folder before npm init
pwd
# Should show your project root path

# Inspect package.json contents
cat package.json              # Mac/Linux/Git Bash
type package.json             # Windows CMD

# Validate package.json is not broken JSON
node -e "require('./package.json')"
# No output = valid
# SyntaxError = broken — find the trailing comma or bad quote

# See all available scripts
npm run
# Lists every script in the scripts section

# Check what version of Playwright is installed
npx playwright --version

# Check Node version matches engines field
node --version
```

---

## 8. INTERVIEW ANSWER

"package.json is the project identity file — it defines the
project name, scripts, and dependencies. I define all test
scripts there: `npm test` for CI runs, `npm run test:headed`
for local debugging, `npm run report` for the HTML report.
Playwright goes under `devDependencies` because it is a test
tool not production code. In CI I use `npm ci` instead of
`npm install` — it reads `package-lock.json` for exact versions,
is faster, and never modifies the lockfile. A broken
`package.json` stops the CI pipeline before any test runs,
so I always validate it with
`node -e require('./package.json')` if something looks wrong."

---

## Connection Forward

```
package.json scripts
    ↓
M07_GitHub_Actions
→ npm ci reads package-lock.json
→ npm test runs "test" script
→ broken package.json = pipeline never starts

package.json devDependencies
    ↓
Every module that uses @playwright/test
→ import { test, expect } from '@playwright/test'
→ only works because @playwright/test is in devDependencies
```

- How to Run and Verify

# From inside 01_npm_init folder

node -e "require('./package.json')"

# No output = your package.json is valid JSON

# See all scripts

npm run

# Should list: test, test:headed, test:debug, report, lint
