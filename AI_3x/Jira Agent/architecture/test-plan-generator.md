# SOP — Test Plan Generator

## Goal
Given a Jira issue key, produce a formal Test Plan document (WHEN & HOW) and render it as styled Markdown.

## Inputs
- `jiraId`: string — e.g. `VWO-48` or `ECOM-1`
- `config`: `{ jiraUrl, jiraEmail, jiraToken, groqKey }` — from UI or server `.env`

## Tool Logic

```
1. fetchIssue(config, jiraId)
   → GET /rest/api/3/issue/{key}
   → flattenAdf(description)           ← strips ADF tree to plain text
   → returns normalized Issue object

2. generateTestPlan(config, issue)
   → buildMessages(issue)              ← assembles system + user prompt
   → groqChat(config, messages)        ← calls GROQ API
   → strips markdown fences if present
   → JSON.parse(cleaned)               ← returns TestPlan object

3. renderMarkdown(plan)                ← deterministic, no LLM involved
   → returns Markdown string

4. Response: { issue, plan, markdown }
```

## Output Schema (see docs/LLM.md)

13 sections: Objective, Scope, Inclusions, Test Environments, Defect Reporting, Test Strategy, Schedule, Deliverables, Entry Criteria, Exit Criteria, Tools, Risks & Mitigations, Approvals.

## Edge Cases

| Scenario | Handling |
|----------|---------|
| No ADF description | `description` field will be empty string; prompt includes "(no description provided)" |
| GROQ returns markdown-fenced JSON | Fence stripped before `JSON.parse()` |
| Missing `inclusions` key | `renderMarkdown` uses `list(plan.inclusions)` which safely handles `undefined` via `(arr || [])` |
| Jira 401 / 403 | Error bubbles as `Jira ${status}: ${body}` — displayed in UI error box |
| GROQ 429 rate limit | Error bubbles as `GROQ 429: ...` — user must retry |
