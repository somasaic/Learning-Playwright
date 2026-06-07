# LLM.md — Project Constitution

> This file is **law**. Update it when schemas change, rules are added, or architecture is modified.

---

## Data Schemas

### Input — Jira Issue (normalized)
```json
{
  "key": "string",
  "summary": "string",
  "description": "string (ADF flattened to plain text)",
  "issueType": "string",
  "status": "string",
  "priority": "string",
  "components": ["string"],
  "labels": ["string"],
  "fixVersions": ["string"],
  "reporter": "string",
  "assignee": "string",
  "created": "ISO-8601",
  "updated": "ISO-8601"
}
```

### Output — Test Plan JSON
```json
{
  "testPlanId": "string",
  "sourceIssue": "string",
  "title": "string",
  "objective": "string",
  "scope": { "inScope": ["string"], "outOfScope": ["string"] },
  "inclusions": ["string"],
  "testEnvironments": ["string"],
  "defectReporting": "string",
  "testStrategy": ["string"],
  "schedule": [{ "phase": "string", "owner": "string", "dates": "string" }],
  "deliverables": ["string"],
  "entryCriteria": ["string"],
  "exitCriteria": ["string"],
  "tools": ["string"],
  "risks": [{ "risk": "string", "mitigation": "string" }],
  "approvals": [{ "role": "string", "name": "string" }]
}
```

### Output — Test Strategy JSON
```json
{
  "strategyId": "string",
  "sourceIssue": "string",
  "title": "string",
  "objective": "string",
  "scope": { "inScope": ["string"], "outOfScope": ["string"] },
  "focusAreas": [{ "area": "string", "details": "string" }],
  "approach": [{ "technique": "string", "description": "string" }],
  "deliverables": ["string"],
  "teamAndSchedule": {
    "teamSize": "string",
    "duration": "string",
    "phases": [{ "phase": "string", "timeline": "string", "activities": "string" }]
  },
  "entryCriteria": ["string"],
  "exitCriteria": ["string"],
  "risks": [{ "risk": "string", "mitigation": "string" }]
}
```

---

## Behavioral Rules

1. **Data-First**: Never call GROQ before the Jira issue is fetched and normalized.
2. **Deterministic Rendering**: Markdown is rendered from JSON by code — never ask the LLM to produce Markdown directly.
3. **No Hallucination**: Prompts instruct the model to use "TBD" for missing information, not invent facts.
4. **JSON-Only Output**: GROQ is always called with `response_format: { type: 'json_object' }` when the model supports it. If not, code strips markdown fences before parsing.
5. **Config Priority**: UI-supplied config always overrides server `.env`.
6. **Secrets Never Exposed**: `/api/config` only returns `hasJiraToken` and `hasGroqKey` booleans — never raw keys.

---

## Architectural Invariants

- **Layer 1 (Architecture)**: `docs/`, `architecture/`, `Seed/` — documentation, schemas, SOPs
- **Layer 2 (Navigation)**: `server.js` (dev proxy) + `api/` (Vercel serverless functions)
- **Layer 3 (Tools)**: `tools/jiraClient.js`, `tools/groqClient.js`, `tools/testPlan.js`, `tools/testStrategy.js`
- **UI**: React + Vite SPA in `src/`

## Maintenance Log

| Date | Change | Reason |
|------|--------|--------|
| 2026-06-07 | Initial project created | B.L.A.S.T. Phase 1 build |
| 2026-06-07 | Added JSON fence stripping in parser | GROQ sometimes wraps output in ```json``` even with json_object mode |
| 2026-06-07 | Fixed markdown table renderer | Multi-row tables were collapsing to single row due to regex `.` not matching newlines |
