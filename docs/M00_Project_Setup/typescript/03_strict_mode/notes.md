# 03 — strict mode

## What it is
strict: true in tsconfig.json turns on TypeScript's
strictest type checking rules all at once.

## What it enables (the important ones)
- noImplicitAny — every variable and parameter must have a type
- strictNullChecks — null and undefined are not interchangeable with other types
- strictFunctionTypes — function parameter types must match exactly

## Why it matters in Playwright
Without strict mode TypeScript behaves almost like JavaScript.
With strict mode it catches:
- Misspelled method names on locators
- Missing null checks on page elements
- Wrong types passed to fillEmail() or login()

## The one rule
Never turn strict off to make errors go away.
Fix the type instead. Turning strict off defeats the
entire reason for using TypeScript.

## tsconfig.json setting
{
  "compilerOptions": {
    "strict": true
  }
}
This one line enables 8 strict checks simultaneously.

## What can go wrong
- Turning on strict mid-project → 50+ errors appear at once (normal, fix one by one)
- Using 'any' to silence strict errors → defeats the purpose
- Missing 'types: ["node"]' → process.env throws strict error in config file

## How to check strict errors without running tests
npx tsc --noEmit
Shows all type errors across the project.
Zero output = no errors.

## Interview answer
"I use strict: true in tsconfig.json — it forces every
parameter and variable to have an explicit type. In Playwright
this means misspelled locator methods and wrong types passed to
page actions are caught at write time, not during a test run.
It makes the framework more reliable without adding runtime cost."