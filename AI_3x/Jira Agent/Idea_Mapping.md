
# Problem Statement

Take a Jira ID that describes a feature (for example, a dummy login page or dashboard feature), fetch the ticket, and generate a formal Test Strategy from it using a standard test strategy template.

The solution needs a UI that supports dark mode and light mode, and it must be hosted on Vercel.

Template - https://drive.google.com/drive/folders/11eAx342NHP1NGiqD_yQMAqfkZkbIjzNR

Deliverables: source code on GitHub, a live Vercel deployment, and a screenshot of the running app.


# Foundation - B.L.A.S.T. Framework

During my AI testing training I learned the B.L.A.S.T. framework and built a Jira-driven Test Plan Generator with it. That learning is the base of this project:

- Layered architecture: `api/` → `tools/` → LLM, with a React `src/` front end
- Atomic, deterministic tools, where the LLM produces JSON content and code renders the Markdown
- Project memory docs (`LLM.md`, `task_plan.md`, `findings.md`, `progress.md`) and seed docs (`B.L.A.S.T.md`, `Objective.md`)

The Jira Agent reuses that architecture and extends it into a multi-tool platform.


# New Repo - Jira Agent

https://github.com/somasaic/Jira-Agent

Live Vercel Link - https://jira-agent-asky.vercel.app/


# My Insights to build Jira Agent

The core task is Test Strategy Buddy: fetch a Jira ticket and create a Test Strategy.

I also wanted one UI that offers both Test Strategy and Test Plan Generator, because more features are likely to follow. The Jira Agent becomes a platform where each capability (Get Test Plan, Get Test Strategy, Test Case Generation, and so on) is a tool. Every tool fetches Jira data and generates a document, and each works independently based on what the user selects.

So I designed a new repo (https://github.com/somasaic/Jira-Agent) that follows the B.L.A.S.T. folder structure and adds the new features on top of it.


## B.L.A.S.T. Project Structure (single tool)

- project root
    -> api folder
    -> architecture folder
    -> tools folder
    -> src folder
    -> LLM.md
    -> task_plan.md
    -> findings.md
    -> progress.md
    -> B.L.A.S.T.md
    -> Objective.md
    -> Readme.md
    -> .env
    -> .gitignore
    -> .vercelignore
    -> prompt.md
    -> index.html
    -> package.json
    -> package-lock.json
    -> vercel.json
    -> server.js
    -> vite.config.ts


## New Jira Agent Repo's Estimated Folder Structure -

- JiraAgent (main)
    test_plan_generator Folder
        -> api folder
        -> architecture folder
        -> tools folder
        -> src folder
        -> docs folder
            -> LLM.md
            -> task_plan.md
            -> findings.md
            -> progress.md
        -> Seed Folder
            -> B.L.A.S.T.md
            -> Objective.md
        -> Readme.md - contains Test Plan Generator insights
        -> prompt.md - task based prompt


    test_strategy_buddy Folder
        -> api folder
        -> architecture folder
        -> tools folder
        -> src folder
        -> docs folder
            -> LLM.md
            -> task_plan.md
            -> findings.md
            -> progress.md
        -> Seed Folder
            -> B.L.A.S.T.md
            -> Objective.md
        -> Readme.md - contains Test Strategy Buddy insights
        -> prompt.md - contains task based prompt

    -> .env
    -> .gitignore
    -> .vercelignore
    -> index.html
    -> Readme.md - complete jira agents information
    -> package.json
    -> package-lock.json
    -> vercel.json
    -> server.js
    -> vite.config.ts
