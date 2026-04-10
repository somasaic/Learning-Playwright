CONCEPT 1: Terminal Commands (cd, mkdir, ls)

1. WHAT IS THIS

- These are operating system commands you type in your terminal (VS Code terminal, PowerShell, or bash)
- They let you create, navigate, and inspect folders without clicking around

2. WHY THIS IS USED

- Every professional SDET works in terminal — CI/CD servers have no GUI
- You must be able to set up a project from zero in any environment

3. WHERE IT IS USED

- First 5 minutes of every new project setup
- CI/CD pipeline (GitHub Actions runs these same commands on ubuntu-latest)

4. HOW IT WORKS -

commands :-

- bash
  mkdir sdet-stlc-portfolio # creates project folder
  cd sdet-stlc-portfolio # moves into it
  mkdir pages tests fixtures # creates 3 subfolders at once
  ls # lists what's inside (Mac/Linux)
  dir # same thing on Windows

5. REAL PROJECT EXAMPLE -

# This is exactly what you run on Day 1 of any SDET project

commands : -

- bash
  mkdir sdet-stlc-portfolio
  cd sdet-stlc-portfolio
  mkdir pages tests fixtures
  code . # opens VS Code in this folder

6. WHAT CAN GO WRONG

- cd into wrong folder → npm init creates package.json in wrong place
- Fix: always run pwd (Mac/Linux) or cd alone (Windows) to confirm where you are

7. HOW TO DEBUG

- pwd → prints your current working directory
- ls -la → shows hidden files too (like .github folder)

8. INTERVIEW ANSWER

"I use terminal commands to scaffold my project structure — mkdir for folders, cd to navigate, and code . to open VS Code. This matters because CI servers like GitHub Actions run these same commands headlessly — no GUI involved."
