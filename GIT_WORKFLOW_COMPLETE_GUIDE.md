# Git Workflow Complete Guide: Push Files to GitHub

## 📋 Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Step-by-Step Workflow](#step-by-step-workflow)
4. [Real-World Scenarios](#real-world-scenarios)
5. [Advanced Commands](#advanced-commands)
6. [Troubleshooting](#troubleshooting)

---

## Introduction

This guide covers the complete Git workflow for pushing files to a GitHub repository in a real-world professional environment. It includes best practices, practical examples, and common scenarios you'll encounter in your development career.

**Goals:**
- Understand Git fundamentals
- Learn the complete push workflow
- Practice real-world Git operations
- Handle merge scenarios and conflicts
- Follow industry-standard conventions

---

## Prerequisites

### ✅ Required Software
- **Git**: Version 2.0 or higher
- **GitHub Account**: With repository access
- **Terminal/PowerShell**: Command-line access
- **Text Editor**: VS Code or similar

### ✅ Verify Installation
```powershell
git --version
git config --list
```

### ✅ Basic Git Configuration
```powershell
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

---

## Step-by-Step Workflow

### **Step 1: Navigate to Your Project Directory**

Change to your project folder:

```powershell
cd f:\Automation_Upskill\PlaywrightLearning
```

**Why:** Git commands need to run within the project directory to access the `.git` folder.

**Real-world tip:** In jobs, you might have multiple projects. Always verify your directory:
```powershell
pwd  # Shows current directory
ls   # Lists files to confirm you're in the right place
```

---

### **Step 2: Check if Git Repository Exists**

```powershell
git status
```

**Expected Output:**
```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

**If you get "fatal: not a git repository" error:**
```powershell
git init                    # Initialize a new repository
git remote add origin <URL> # Connect to GitHub
```

**Real-world scenario:**
- Projects already have `.git` folder
- You rarely run `git init` in established projects
- Always verify the remote is correct: `git remote -v`

---

### **Step 3: View Remote Repository Configuration**

See what GitHub repository you're connected to:

```powershell
git remote -v
```

**Output Example:**
```
origin  https://github.com/somasaic/Learning-Playwright.git (fetch)
origin  https://github.com/somasaic/Learning-Playwright.git (push)
```

**Understanding:**
- `origin` = nickname for your GitHub repository
- `fetch` = URL for pulling code from GitHub
- `push` = URL for uploading code to GitHub
- `upstream` = (in forks) original repository

**Real-world tip:**
Multiple remotes possible:
```powershell
git remote add upstream https://github.com/original/repo.git
```

---

### **Step 4: Create or Modify Files**

Create your new file (e.g., `07_Operators.js`):

```javascript
// Example file content
console.log("Learning Git workflow!");
```

**Real-world scenarios:**
- Modify existing files
- Create new features
- Fix bugs
- Add documentation

---

### **Step 5: Check What Changed (Git Status)**

```powershell
git status
```

**Expected Output:** Untracked files appear in red

```
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include what will be committed)
        07_Operators.js

nothing added to commit but untracked files present (use "git add" to track)
```

**Key Terms:**
- **Untracked**: New files Git hasn't seen before
- **Modified**: Existing files you changed
- **Staged**: Files ready to be committed
- **Committed**: Files saved to Git history

---

### **Step 6: View File Changes (Git Diff)**

See what changed in existing files:

```powershell
git diff filename.js
```

**Real-world use:**
- Review modifications before committing
- Understand what you modified
- Catch unintended changes
- Track modifications by team members

---

### **Step 7: Stage Files (Git Add)**

Add files to the staging area:

**Option A: Add specific file**
```powershell
git add 07_Operators.js
```

**Option B: Add multiple files**
```powershell
git add 07_Operators.js 06_hoisting.js README.md
```

**Option C: Add all changes** (use carefully!)
```powershell
git add .
```

**Option D: Interactive staging** (select specific changes)
```powershell
git add -p
```

**Real-world best practice:**
- Add specific files related to one task
- Avoid bulk `git add .` unless necessary
- In teams, it's common practice to add related files together

---

### **Step 8: Verify Staging Area**

```powershell
git status
```

**Expected Output:** Files appear in green

```
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   07_Operators.js
```

**If you need to unstage:**
```powershell
git restore --staged 07_Operators.js
```

---

### **Step 9: Create Meaningful Commit Messages**

Commit messages should be descriptive and follow conventions:

**Format:**
```
[Type]: [Subject]

[Optional detailed description]
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `refactor:` Code reorganization
- `test:` Adding tests
- `chore:` Maintenance tasks

**Examples:**

✅ **Good:**
```powershell
git commit -m "feat: Add 07_Operators.js with comprehensive JavaScript operators guide"
```

✅ **Good:**
```powershell
git commit -m "docs: Add Git workflow complete guide for team reference"
```

❌ **Bad:**
```powershell
git commit -m "updated files"
```

❌ **Bad:**
```powershell
git commit -m "fix bug"
```

**Real-world tip:** Clear commits help:
- Understanding project history
- Reverting changes if needed (git revert)
- Code reviews in pull requests
- Collaborating with team members

---

### **Step 10: Commit Changes**

```powershell
git commit -m "feat: Add 07_Operators.js with comprehensive JavaScript operators guide"
```

**Expected Output:**
```
[main 9acb61d] feat: Add 07_Operators.js with comprehensive JavaScript operators guide
 1 file changed, 150 insertions(+)
 create mode 100644 07_Operators.js
```

---

### **Step 11: View Commit History**

See all commits:

```powershell
git log
```

See concise log:

```powershell
git log --oneline -10
```

**Output Example:**
```
9acb61d (HEAD -> main) feat: Add 07_Operators.js
a45808f (origin/main) Add hoisting guide
f09c0b9 Add variables.js
3935627 Initial commit: Add Playwright scripts
```

**Key information:**
- **9acb61d** = Commit hash (unique identifier)
- **HEAD -> main** = Your current position
- **origin/main** = Where GitHub is currently at

**Real-world uses:**
```powershell
git log --author="Name"              # Filter by author
git log --grep="keyword"             # Search commit messages
git log --since="2 weeks ago"        # Time-based filtering
git log --oneline --graph --all      # Visual branch history
```

---

### **Step 12: Push to GitHub**

Upload your commits to the remote repository:

```powershell
git push origin main
```

**Breakdown:**
- `git push` = Upload command
- `origin` = Remote repository name
- `main` = Branch name

**Expected Output:**
```
Counting objects: 3, done.
Delta compression using up to 8 threads.
Compressing objects: 100%, done.
Writing objects: 100%, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/somasaic/Learning-Playwright.git
   a45808f..9acb61d main -> main
```

**Real-world scenarios:**

Push to specific branch:
```powershell
git push origin feature-branch
```

Push all branches:
```powershell
git push origin --all
```

Force push (dangerous! Use only if absolutely sure):
```powershell
git push origin main --force
```

---

### **Step 13: Verify Push Success**

```powershell
git status
```

**Expected Output:**
```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

**Key indicator:** "Your branch is up to date with 'origin/main'" ✅

---

## Real-World Scenarios

### **Scenario 1: Working with Multiple Files**

You've modified several files related to one feature:

```powershell
# View what changed
git status

# Stage related files
git add feature_file1.js
git add feature_file2.js
git add documentation.md

# Verify staging
git status

# One meaningful commit for the whole feature
git commit -m "feat: Implement user authentication module"

# Push to GitHub
git push origin main
```

---

### **Scenario 2: Handling Modified Files**

You modified an existing file but want to keep a backup:

```powershell
# View changes
git diff config.js

# Keep changes and commit
git add config.js
git commit -m "fix: Update configuration for production environment"
git push origin main

# Revert changes (undo to last commit)
git restore config.js

# Unstage without reverting
git restore --staged config.js
```

---

### **Scenario 3: Working on a Feature Branch (Real Job Practice)**

In professional teams, you don't push directly to `main`:

```powershell
# Create a new branch for your feature
git branch feature/operators-guide
git checkout feature/operators-guide

# Or in one command (Git 2.23+)
git switch -c feature/operators-guide

# Make changes and commit
git add 07_Operators.js
git commit -m "feat: Add comprehensive operators guide"

# Push your branch
git push origin feature/operators-guide

# On GitHub: Create Pull Request (PR)
# Team reviews code → Approves → Merges to main
```

---

### **Scenario 4: Pulling Latest Before Starting Work**

Always sync before starting new work:

```powershell
# Get latest code from GitHub
git pull origin main

# This is equivalent to:
# git fetch origin main (download changes)
# git merge origin/main (merge into your branch)
```

**Real-world workflow:**
```powershell
# Morning routine: Get latest code
git pull origin main

# Create your branch
git switch -c feature/new-feature

# Do your work, commit, push
# ...

# Before merging, pull latest to avoid conflicts
git pull origin main
```

---

### **Scenario 5: Resolving Merge Conflicts**

When multiple people edit the same file:

```powershell
# Attempt to merge or pull
git pull origin main

# Conflict markers appear:
'''
<<<<<<< HEAD
Your changes
=======
Someone else's changes
>>>>>>>
'''

# Edit file to resolve
# Keep what you want, delete conflict markers

# After resolving
git add conflicted_file.js
git commit -m "Merge: Resolve conflicts in file.js"
git push origin main
```

---

## Advanced Commands

### **View Detailed Commit Information**

```powershell
git show 9acb61d              # Show specific commit details
git blame filename.js         # See who modified each line
git log --stat                # Show files changed per commit
```

### **Amend Last Commit**

Fix your last commit message or add forgotten files:

```powershell
# Fix commit message
git commit --amend -m "New message"

# Add forgotten file to last commit
git add forgotten_file.js
git commit --amend --no-edit
```

⚠️ **Warning:** Only use if not pushed to GitHub yet!

### **Create Tags for Releases**

Mark important versions:

```powershell
# Create tag
git tag v1.0.0

# Add description
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tags
git push origin v1.0.0
git push origin --tags  # All tags
```

### **Temporarily Stash Changes**

Save work without committing:

```powershell
# Save current changes
git stash

# List stashed changes
git stash list

# Restore stashed changes
git stash pop

# Delete stash
git stash drop
```

### **Cherry-pick Specific Commits**

Apply a specific commit to your branch:

```powershell
git cherry-pick 9acb61d
```

---

## Troubleshooting

### **Problem: "Permission Denied" or Authentication Issues**

**Solution:**
```powershell
# Check if using HTTPS or SSH
git remote -v

# For HTTPS: Update credentials (Windows Credential Manager)
# For SSH: Generate and add SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"
cat ~/.ssh/id_ed25519.pub  # Copy this to GitHub settings
```

### **Problem: "Your branch is ahead of 'origin/main' by X commits"**

**Solution:** You have commits that haven't been pushed yet
```powershell
git log origin/main..HEAD  # See commits to push
git push origin main       # Push them
```

### **Problem: "Rejected: Updates were rejected"**

**Solution:** Someone pushed while you were working
```powershell
git pull origin main       # Get their changes
git push origin main       # Push yours
```

### **Problem: "Detached HEAD" State**

**Solution:** You're not on a branch
```powershell
git status                          # Will show detached HEAD
git switch -c your-branch-name     # Create new branch
git switch main                     # Or go back to main
```

### **Problem: Accidentally Committed to Wrong Branch**

**Solution:**
```powershell
git log --oneline -5               # Find your commit
git reset HEAD~1                   # Undo commit
git switch correct-branch          # Switch branch
git commit -m "Your message"       # Re-commit on correct branch
```

### **Problem: Want to Undo a Pushed Commit**

**Solution:**
```powershell
# View commit to undo
git log --oneline -5

# Create new commit that undoes it (safe method)
git revert 9acb61d

# This creates a NEW commit that reverses the changes
git push origin main
```

---

## Best Practices Checklist

✅ **Before Committing:**
- [ ] Changed files are related to one task
- [ ] Code is tested and working
- [ ] No debug statements left in code
- [ ] Files are properly staged

✅ **Commit Messages:**
- [ ] Clear and descriptive
- [ ] Written in imperative mood ("Add" not "Added")
- [ ] Less than 50 characters for subject line
- [ ] Related files grouped together

✅ **Before Pushing:**
- [ ] Pull latest from GitHub (`git pull origin main`)
- [ ] Review your changes (`git log -1 -p`)
- [ ] Verify you're on correct branch

✅ **Team Collaboration:**
- [ ] Don't push directly to `main` (use branches)
- [ ] Create Pull Requests for code review
- [ ] Always pull before starting new work
- [ ] Communicate with team about changes

---

## Complete Workflow Summary

| # | Task | Command |
|---|------|---------|
| 1 | Navigate to project | `cd path/to/project` |
| 2 | Check repository status | `git status` |
| 3 | View remote | `git remote -v` |
| 4 | Create/modify files | (Use editor) |
| 5 | View changes | `git diff filename` |
| 6 | Stage files | `git add filename` |
| 7 | Verify staging | `git status` |
| 8 | Commit changes | `git commit -m "message"` |
| 9 | View history | `git log --oneline` |
| 10 | Push to GitHub | `git push origin main` |
| 11 | Verify push | `git status` |

---

## Quick Reference Commands

```powershell
# Setup
git config --global user.name "Name"
git config --global user.email "email@example.com"

# Daily workflow
git status              # What changed?
git add filename        # Stage specific file
git add .               # Stage all changes
git commit -m "msg"     # Create snapshot
git push origin main    # Upload to GitHub
git pull origin main    # Download from GitHub

# Viewing history
git log --oneline       # Last commits
git diff filename       # View changes
git show commit_hash    # Specific commit details

# Branching
git branch              # List branches
git switch -c name      # Create and switch
git merge branch_name   # Merge branches

# Undoing
git restore filename    # Discard changes
git reset HEAD~1        # Undo last commit
git revert hash         # Create undo commit
```

---

## Conclusion

Mastering Git workflow is essential for modern development. This guide covers:
- ✅ Complete step-by-step process
- ✅ Real-world scenarios
- ✅ Professional best practices
- ✅ Troubleshooting common issues

**Next Steps:**
1. Practice this workflow daily
2. Learn branching and pull requests
3. Understand merge conflicts resolution
4. Collaborate with team on GitHub

---

## Resources

- [Official Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com)
- [Git Cheat Sheet](https://git-scm.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org)

---

**Created:** February 22, 2026  
**Purpose:** Learning and Practice  
**Version:** 1.0
