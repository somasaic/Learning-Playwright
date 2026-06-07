# Progress Log

## 2026-06-07 — Initial Build Complete

### What was done
- Created full React + Vite SPA with dark/light mode
- Implemented all 3 layers of A.N.T. architecture
- Built `tools/jiraClient.js` with full ADF flattening support
- Built `tools/groqClient.js` with JSON mode support
- Built `tools/testPlan.js` — generates Test Plan JSON + renders Markdown
- Built `tools/testStrategy.js` — generates Test Strategy JSON + renders Markdown
- Built `server.js` — Express proxy for local dev (port 8787)
- Built `api/generate-plan.js`, `api/generate-strategy.js`, `api/config.js` — Vercel serverless
- Built all React components: ThemeToggle, ToolSelector, Settings, Generator, TestPlanView, TestStrategyView

### Bugs fixed
- **JSON fence stripping**: GROQ sometimes returns output wrapped in ```json...``` even with `json_object` mode. Added `cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '')` before `JSON.parse()`.
- **Markdown table renderer**: Old regex-based approach collapsed multi-row tables. Replaced with line-by-line parser that properly groups table rows and emits `<thead>/<tbody>`.
- **Settings.jsx stale state**: Added `useEffect` to sync `local` state when `config` prop changes.
- **api/config.js security**: Was exposing raw token/key values; now only returns boolean flags.
- **GROQ model guard**: Added `JSON_MODE_SUPPORTED` set to avoid sending `response_format` to models that don't support it.

### Next steps
- [ ] Add `.env` file with real credentials and run `node tools/handshake.js`
- [ ] Run `npm run dev` and do smoke test for both tools
- [ ] Push to GitHub: https://github.com/somasaic/JiraAgent
- [ ] Deploy to Vercel: https://jira-agent.vercel.app
