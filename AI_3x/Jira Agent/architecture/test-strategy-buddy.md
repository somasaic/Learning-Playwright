# SOP — Test Strategy Buddy

## Goal
Given a Jira issue key, produce a high-level Test Strategy document (WHAT & WHY) using the ecommerce template format, and render it as styled Markdown.

## Distinction: Strategy vs Plan

| Dimension | Test Strategy | Test Plan |
|-----------|--------------|-----------|
| Answers | WHAT & WHY | WHEN & HOW |
| Level | High-level, project-wide | Detailed, feature-specific |
| Audience | Stakeholders, QA leads | QA engineers, dev team |
| Contains | Scope, approach, focus areas, methodology | Schedule, environments, defect process, tools |

## Inputs
- `jiraId`: string — e.g. `VWO-48`
- `config`: `{ jiraUrl, jiraEmail, jiraToken, groqKey }` — from UI or server `.env`

## Tool Logic

```
1. fetchIssue(config, jiraId)          ← same as Test Plan Generator
   → normalized Issue object

2. generateTestStrategy(config, issue)
   → buildMessages(issue)              ← QA Strategist system prompt
   → groqChat(config, messages)        ← calls GROQ API
   → strips markdown fences if present
   → JSON.parse(cleaned)               ← returns TestStrategy object

3. renderMarkdown(strategy)            ← deterministic, no LLM involved
   → returns Markdown string

4. Response: { issue, strategy, markdown }
```

## Output Schema (see docs/LLM.md)

9 sections: Objective, Scope (In/Out), Focus Areas, Testing Approach, Deliverables, Team & Schedule, Entry Criteria, Exit Criteria, Risks & Mitigations.

## System Prompt Distinctions

The Test Strategy system prompt emphasizes:
- "HIGH-LEVEL document that defines WHAT and WHY"
- "different from a Test Plan"
- "focus areas" (Functional, Performance, Security, etc.)
- "methodology" (Black-box, Automation, Risk-based, etc.)

## Edge Cases

Same as Test Plan Generator — see `architecture/test-plan-generator.md`.

Additional: if `teamAndSchedule` key is missing from GROQ response, the renderer falls back to "TBD" gracefully.
