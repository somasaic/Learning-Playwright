# Objective — Jira Agent Platform

## Task (Given by Pramod)

Fetch a Jira ID and generate a formal QA document (Test Plan or Test Strategy) from its contents using an LLM, with a React UI that supports dark/light mode, hosted on Vercel.

## Extended Vision (Somasai)

Build a **unified platform** with multiple independent tools, each fetching a Jira ticket and producing a different QA artifact. The platform is extensible — new tools (Test Case Generator, Bug Report Analyzer, etc.) can be added as new tabs without touching the core architecture.

## Tools in v1.0

| Tool | Tab | Output |
|------|-----|--------|
| Test Plan Generator | `plan` | Formal Test Plan (WHEN & HOW): environments, schedule, scope, risks |
| Test Strategy Buddy | `strategy` | High-level Test Strategy (WHAT & WHY): focus areas, approach, methodology |

## Delivery Checklist

- [x] Jira issue fetch + ADF description parsing
- [x] GROQ-powered document generation (JSON schema)
- [x] Deterministic Markdown rendering
- [x] Dark/light mode React SPA
- [x] Download .md + Copy Markdown actions
- [x] Vercel serverless API routes (`api/`)
- [x] Local Express proxy for development (`server.js`)
- [x] Settings panel (credentials stored in localStorage)
- [ ] Live at: https://jira-agent.vercel.app
- [ ] GitHub: https://github.com/somasaic/JiraAgent

## Reference

- Pramod's original repo: https://github.com/PramodDutta/AITesterBlueprint3x/tree/main/chapter_03_BLAST_FW_JIRA_AI_AGENT
- Live reference: https://jira-ai.vercel.app/
- Template: https://drive.google.com/drive/folders/11eAx342NHP1NGiqD_yQMAqfkZkbIjzNR
