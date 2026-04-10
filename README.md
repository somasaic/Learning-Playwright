# 🎭 Learning Playwright — SDET Upskill Journey

> From QA Executive to Mid-Level Automation Engineer  
> Playwright · TypeScript · CI/CD · STLC  
> April 2026 — Soma Sai Dinesh Cheviti

---

## 🎯 What This Repo Is

This repository is a **structured 9-module learning system** designed to take a QA professional with basic automation exposure and build them into a **mid-level SDET** capable of:

- Building Playwright + TypeScript frameworks from scratch
- Implementing Page Object Model, Fixtures, and API Mocking
- Running cross-browser parallel test suites in CI/CD
- Documenting the full STLC from requirement to closure
- Answering technical interview questions with real project evidence

Every module follows the same pattern:  
**Learn the concept → Apply in real code → Understand the interview answer**

---

## 📊 Progress Tracker

| Module | Status | Key Deliverable |
|--------|--------|----------------|
| M00 — Project Setup | ✅ In Progress | playwright.config.ts · folder structure |
| M01 — Selectors + POM | 🔜 Upcoming | LoginPage.ts |
| M02 — Test Cases | 🔜 Upcoming | vwo_login.spec.ts (6 TCs) |
| M03 — Fixtures | 🔜 Upcoming | auth.fixture.ts · testData.ts |
| M04 — API Mocking | 🔜 Upcoming | route.fulfill() tests |
| M05 — Cross-Browser | 🔜 Upcoming | 5-browser config |
| M06 — Reporting | 🔜 Upcoming | HTML report + trace |
| M07 — GitHub Actions | 🔜 Upcoming | workflow pipeline |
| M08 — STLC Docs | 🔜 Upcoming | Full STLC chain |

---

## 🏃 How to Run

\\\ash
# Install dependencies
npm ci

# Install browsers
npx playwright install

# Run all tests
npm test

# Run headed (see browser)
npm run test:headed

# Open HTML report
npm run report
\\\

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Test Runner | Playwright v1.x |
| Language | TypeScript |
| CI/CD | GitHub Actions |
| Browsers | Chromium · Firefox · WebKit |
| Reporting | Playwright HTML Reporter |
| Project | VWO Login Page (live target) |

---

## 📚 9 Modules — Sequence & Purpose

### **M00 — Project Setup** ✅ (Current)
**Goal:** Scaffold a professional Playwright project from zero  
**Concepts:** Terminal commands · npm · TypeScript config · Playwright config · folder structure  
**Why it matters:** Framework decision traces back to setup. Interviewers see structure first.  
📖 [Read M00 Notes](./docs/M00_Project_Setup/MODULE_NOTES.md)

---

### **M01 — Selectors + Page Object Model**
**Goal:** Build LoginPage.ts — a proper POM class with typed locators  
**Concepts:** JS Classes · constructor · TypeScript properties · getByRole · POM pattern  
**Why it matters:** POM is the #1 pattern every SDET interview asks about.

---

### **M02 — Test Cases + Assertions**
**Goal:** Write 6 test cases in vwo_login.spec.ts  
**Concepts:** async/await · test.describe · expect assertions · test data  
**Why it matters:** Writing tests from scratch under pressure is a live coding requirement.

---

### **M03 — Fixtures + Test Data**
**Goal:** Eliminate setup code using Playwright fixtures  
**Concepts:** test.extend() · fixture pattern · storageState · typed fixtures  
**Why it matters:** Fixtures separate setup from test logic — framework vs script.

---

### **M04 — API Mocking**
**Goal:** Intercept & mock the VWO login API  
**Concepts:** page.route() · route.fulfill() · HTTP status codes · JSON  
**Why it matters:** Test error states without a real server — critical for product companies.

---

### **M05 — Cross-Browser + Parallel**
**Goal:** Run all tests across 5 browser/device configurations  
**Concepts:** projects array · devices · workers · fullyParallel  
**Why it matters:** Cross-browser config separates test scripts from automation suites.

---

### **M06 — Reporting + Retry**
**Goal:** Generate HTML reports with screenshots, configure retry  
**Concepts:** HTML reporter · screenshot · video · trace viewer · retries  
**Why it matters:** Debug failing tests in CI using trace viewer.

---

### **M07 — GitHub Actions CI/CD**
**Goal:** Push triggers automatic test runs, report uploaded  
**Concepts:** YAML · on:push trigger · artifact upload · CI=true  
**Why it matters:** Working CI pipeline on GitHub is an immediate differentiator.

---

### **M08 — STLC Documentation**
**Goal:** Map automation back to formal QA documents  
**Concepts:** Test plan · RTM · Bug reports · Test closure  
**Why it matters:** Connect automation to QA process — not just code, strategy.

---

## 👤 Author

**Soma Sai Dinesh Cheviti**  
QA Automation Engineer · SDET Transition Journey  
[GitHub](https://github.com/somasaic)

---

## 📖 Current Module: M00 — Project Setup

All files for M00 are under:
- **Learning materials:** [docs/M00_Project_Setup/](./docs/M00_Project_Setup/)
- **Code examples:** JavaScript, TypeScript, Playwright configurations
- **Interview prep:** Read MODULE_NOTES.md for Q&A

---

*Repository active as of April 2026*
