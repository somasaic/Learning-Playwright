# SOP — API Layer (Layer 2 Navigation)

## Local Development: server.js

Express server on port **8787**. Vite proxy (port 5173) forwards `/api/*` to it.

| Route | Method | Handler |
|-------|--------|---------|
| `/api/config` | GET | Returns `{ jiraUrl, jiraEmail, hasJiraToken, hasGroqKey }` |
| `/api/generate-plan` | POST | Body: `{ jiraId, config? }` → `{ issue, plan, markdown }` |
| `/api/generate-strategy` | POST | Body: `{ jiraId, config? }` → `{ issue, strategy, markdown }` |

Config priority: `body.config` fields override `.env` values.

## Production: Vercel Serverless (api/)

Same 3 routes as serverless functions. `vercel.json` rewrites `/api/*` → `/api/$1` and all other routes → `/index.html` (SPA fallback).

## Required Environment Variables (Vercel Dashboard)

```
GROQ_KEY          = gsk_...
JIRA_EMAIL        = you@domain.com
JIRA_API_TOKEN    = ATATT...
JIRA_URL          = https://your-domain.atlassian.net
```

## Security Rules

- `/api/config` NEVER returns raw token or key values — only boolean presence flags.
- Jira credentials never stored server-side beyond the request lifecycle.
- Browser localStorage stores user-supplied credentials only (not server env).
