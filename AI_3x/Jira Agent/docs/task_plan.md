# Task Plan — Jira Agent Platform

## North Star
A unified AI QA platform where a user pastes a Jira ID and receives a fully-formatted, downloadable QA document (Test Plan or Test Strategy) in seconds.

---

## Phases & Checklist

### Phase 1 — Blueprint ✅
- [x] Define North Star outcome
- [x] Identify integrations: Jira Cloud REST API v3, GROQ API (openai/gpt-oss-120b)
- [x] Define data schemas in `docs/LLM.md`
- [x] Create task_plan.md (this file)

### Phase 2 — Link ✅
- [x] `tools/handshake.js` — verifies Jira + GROQ connections
- [x] `.env.sample` — documents required credentials
- [x] Jira Basic Auth verified (email + API token)
- [x] GROQ API key verified

### Phase 3 — Architect ✅
- [x] Layer 1: `docs/LLM.md`, `architecture/`, `Seed/`
- [x] Layer 2: `server.js` (Express proxy), `api/` (Vercel serverless)
- [x] Layer 3: `tools/jiraClient.js`, `tools/groqClient.js`, `tools/testPlan.js`, `tools/testStrategy.js`
- [x] ADF (Atlassian Document Format) flattening for rich Jira descriptions

### Phase 4 — Stylize ✅
- [x] React + Vite SPA
- [x] Dark/light mode with CSS variables
- [x] Tab navigation: Test Plan Generator | Test Strategy Buddy | Settings
- [x] Generator component (shared for both tools)
- [x] TestPlanView + TestStrategyView with proper table rendering
- [x] Download .md + Copy Markdown buttons
- [x] Spinner loading state

### Phase 5 — Trigger (Deployment)
- [ ] Push to GitHub: https://github.com/somasaic/JiraAgent
- [ ] Deploy to Vercel: https://jira-agent.vercel.app
- [ ] Set Vercel environment variables (JIRA_URL, JIRA_EMAIL, JIRA_API_TOKEN, GROQ_KEY)
- [ ] Final smoke test on live URL

---

## Tools Used
| Tool | Purpose |
|------|---------|
| Jira Cloud REST API v3 | Fetch issue data |
| GROQ API (openai/gpt-oss-120b) | Generate QA document content |
| React + Vite | Frontend SPA |
| Express | Local dev proxy |
| Vercel | Serverless API + static hosting |
