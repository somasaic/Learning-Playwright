
# Task - Given by Pramod
You will basically get a Jira ID where the information about a feature will be written. - Create a dummy test feature for a login page or dashboard page. 

Fetch this Jira ID, and I'm going to give you a test strategy document. From that document, you need to create a test strategy. 

You will fetch a Jira ID and you will create a test strategy with the format which I'm going to please create a UI for it. Make sure that the UI supports dark mode and light mode, and you need to upload this UI to Vercel also. 

Template - https://drive.google.com/drive/folders/11eAx342NHP1NGiqD_yQMAqfkZkbIjzNR

You need to upload everything on GitHub also, plus Vercel, both of them. You have to give me the GitHub link, plus a screenshot of Vercel, as well as the link of Vercel. 


# Existing Repo - Test Plan Generator

https://github.com/PramodDutta/AITesterBlueprint3x/tree/main/chapter_03_BLAST_FW_JIRA_AI_AGENT

Live Link - https://jira-ai.vercel.app/



## Explaination -> 
Read and analyse thoroughly the complete folder structure, Project + task details and README.md file of this repo - https://github.com/PramodDutta/AITesterBlueprint3x/blob/main/chapter_03_BLAST_FW_JIRA_AI_AGENT/README.md to understand the project structure and tasks properly. 

that helps to build new jira agent project properly with same architecture.



# New Repo - Jira Agent

https://github.com/somasaic/JiraAgent - new - need to create new repo for it

Live vercel Link - https://jira-agent.vercel.app/ - new link that need to host


# My Insights to build Jira Agent 

A Task (Test Strategy Buddy) - Fetch Jira and Create Test Strategy - task given by Pramod.

Additionally i wanted to create a UI that inculde Test strategy options as well as Test Plan Generator options it because next their will be two more features might be come so i wanted all those in JIRA Agents as with features like Test Plan Generator, Test Strategy Buddy and etc upcoming insights that similar features like Fetch JIRA ID and Get Test Plan & Get Test Strategy or Test Case Generation etc - these are like tools. in short we have to build a platform with 3-4 tools for fetching JIRA data and generating documents based on that. Each tools works independently based on user selection


so -> by analysing existing test plan generator repo - pramods repo(https://github.com/PramodDutta/AITesterBlueprint3x/tree/main/chapter_03_BLAST_FW_JIRA_AI_AGENT),

i came up with an idea to build a new repo(https://github.com/somasaic/JiraAgent) for jira agent and use the same folder structure with adding the new features into it.



## Existing Folder Structure of Pramods Repo -

- chapter_03_BLAST_FW_JIRA_AI_AGENT (main)
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


## New Jira Agent Repo's Estiated Folder Structure -

- JiraAgent (main)
    - chapter_03_BLAST_FW_JIRA_AI_AGENT folder (Rename as test_plan_generator)
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
        -> Readme.md - pramods task insights
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




