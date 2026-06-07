# Jira Agent Platform

A unified AI QA platform for generating formal Test Plans and Test Strategies from Jira issues. Built following the **B.L.A.S.T. Framework** and **A.N.T. 3-Layer Architecture**.

## Features
- **Test Plan Generator:** Generates a detailed Test Plan (WHEN & HOW).
- **Test Strategy Buddy:** Generates a high-level Test Strategy (WHAT & WHY) based on the ecommerce template.
- **Dark/Light Mode:** Premium responsive UI built with React + Vite.

## Setup
1. Clone the repo
2. `npm install`
3. Create a `.env` file based on `.env.sample` with your Jira API token and GROQ API key.
4. `npm run dev`

## Architecture (A.N.T.)
- **Layer 1 (Architecture):** Documentation & Config (`README.md`, `.env`, `docs/`)
- **Layer 2 (Navigation):** Local Proxy Server (`server.js`) and Vercel API Routes (`api/`)
- **Layer 3 (Tools):** Shared atomic capabilities (`tools/jiraClient.js`, `tools/groqClient.js`, `tools/testPlan.js`, `tools/testStrategy.js`)

## Deployment
Hosted on Vercel at [jira-agent.vercel.app](https://jira-agent.vercel.app/).
