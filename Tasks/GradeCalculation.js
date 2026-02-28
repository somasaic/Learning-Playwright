/*
 Reference - of mistakes and improvements:
// Agent - Claude haiku 4.5
// Chat Conversation - Code Review for Automation Improvements
*/

function gradeCalculation(score) {
    // Check if NaN first (NaN is typeof 'number' so must check separately!)
    if (isNaN(score) || typeof score !== 'number' || score < 0 || score > 100) {
        throw new Error(`Invalid score: ${score}`);
    }
    if (score >= 90 && score <= 100) {
        //console.log(`Your grade is 'A' -> ${score}`);
        return 'A';
    } else if (score >= 80 && score < 90) {
        //console.log(`Your grade is 'B' -> ${score}`);
        return 'B';
    } else if (score >= 70 && score < 80) {
        //console.log(`Your grade is 'C' -> ${score}`);
        return 'C';
    } else if (score >= 60 && score < 70) {
        //console.log(`Your grade is 'D' -> ${score}`);
        return 'D';
    } else {
        //console.log(`Your grade is 'F' -> ${score}`);
        return 'F';
    }
}

/*
//  Example usage:
graadeCalculation(95);
graadeCalculation(85);
graadeCalculation(75);
graadeCalculation(65);
graadeCalculation(55);
*/

/*
// Test with different values:
expect(gradeCalculation(95)).toBe('A');
expect(gradeCalculation(85)).toBe('B');
expect(gradeCalculation(75)).toBe('C');


let score = prompt("Enter your score:");
//graadeCalculation(score);
*/

// BEST: Entry point for CLI usage
if (require.main === module) {
    // For CLI, use arguments instead of prompt()
    const score = parseInt(process.argv[2]);
    try {
        console.log(`Grade: ${gradeCalculation(score)}`);
    } catch (error) {
        console.error(error.message);
    }
}


// ESSENTIAL: Export for testing
module.exports = { gradeCalculation };


/*
EXECUTION 1:
----------------------
function gradecalculation(score) {
    if (score >= 90) {
        console.log(`Your grade is 'A' -> ${score}`);
    } else if (80 >= score < 90) {
        console.log(`Your grade is 'B' -> ${score}`);
    } else if (70 >= score < 80) {
        console.log(`Your grade is 'C' -> ${score}`);
    } else if (60 >= score < 70) {
        console.log(`Your grade is 'D' -> ${score}`);
    } else {
        console.log(`Your grade is 'F' -> ${score}`);
    }
}

// Example usage:
graadeCalculation(95);
graadeCalculation(85);
graadeCalculation(75);
graadeCalculation(65);
graadeCalculation(55);

let score = prompt("Enter your score:");
graadeCalculation(score);


Looking at your code from an automation testing mindset, here's what I found:

❌ Critical Issues:
----------------------------
Logic Error - Chained Comparisons Don't Work --

80 >= score < 90 won't work as expected in JavaScript. This evaluates left-to-right incorrectly
Should be: score >= 80 && score < 90
Same issue in all other conditions

1️⃣ Logic Error - Chained Comparisons
❌ What's Wrong:
else if (80 >= score < 90) {  // BROKEN!

Why It's Broken:
JavaScript evaluates this left-to-right:

>> 80 >= score → returns true or false (boolean)
>> true < 90 → compares boolean to number → unpredictable result!

Example:
score = 85
80 >= score < 90

Step 1: 80 >= 85 = false
Step 2: false < 90 = true  // false converts to 0, so 0 < 90 = true ✗ WRONG!

✅ Correct Way:
else if (score >= 80 && score < 90) {  // CORRECT!
-----------------------------------
Function Name Typo --

graadeCalculation → should be gradeCalculation (extra 'a')

2️⃣ Function Name Typo
❌ What's Wrong:
function gradecalculation(score) {  // typo in naming
    // ...
}
graadeCalculation(95);  // different typo - REFERENCE ERROR!

Why It Matters in Automation: -
// This will crash:
graadeCalculation(95);  
// ReferenceError: graadeCalculation is not defined

// In Playwright/Jest:
const result = await page.evaluate(() => graadeCalculation(95));
// TEST FAILS! The function doesn't exist in the page context


-> Naming Convention Issue:
Function defined as: gradecalculation (all lowercase)
Called as: graadeCalculation (camelCase)
This is inconsistent - bad for automation readability

-> Automation Mindset:
Consistent naming = easier to find and maintain
Easy to spot bugs in CI/CD pipelines
Test reports are clearer


----------------------------------
No Return Values --
    Function only console.log() but doesn't return the grade
    In automation, you need to return values to assert them in tests
    Example: You should return the grade letter for validation

3️⃣ No Return Values - The BIGGEST Automation Problem
❌ Current Code (Only Logs):
function gradeCalculation(score) {
    if (score >= 90) {
        console.log(`Your grade is 'A' -> ${score}`);  // Just prints!
    }
}

gradeCalculation(95);  // Prints to console, but returns undefined

The Automation Testing Problem:
In automation, you need to assert (verify) values:

// CANNOT TEST - How do you check the result?
gradeCalculation(95);
// What was the result? You'd have to read console.log!

// This is WRONG for automation:
expect(gradeCalculation(95)).toBe('A');  // Returns undefined! ✗

----------------------------------
Uses prompt() - Not Automation-Friendly

Browser API won't work in automated test frameworks (Playwright, Jest, etc.)
For automation, pass score as a parameter instead

4️⃣ Uses prompt() - Not Automation-Friendly
❌ Current Code:
let score = prompt("Enter your score:");  // Interactive, blocks execution
gradeCalculation(score);
Why It's Wrong for Automation:

// In Playwright - prompt() doesn't exist!
await page.evaluate(() => {
    let score = prompt("Enter your score:");  // ReferenceError! No UI to interact with
});

// In Jest - also doesn't exist!
let score = prompt("Enter your score:");  // ReferenceError!

The Automation Problem:
    -> prompt() is a browser UI function - only works in real browser with user
    -> Automation frameworks are headless - no UI, no user interaction
    -> Tests must be unattended - run 24/7 without human input

✅ Correct Way for Automation:
// Pass data as parameters:
function gradeCalculation(score) {
    // Validation happens here
    if (typeof score !== 'number') {
        throw new Error('Score must be a number');
    }
    
    if (score >= 90) return 'A';
    // ... etc
}

// Test with different values:
expect(gradeCalculation(95)).toBe('A');
expect(gradeCalculation(85)).toBe('B');
expect(gradeCalculation(75)).toBe('C');

Automation Mindset:
Deterministic - Same input = Same output (no user decision)
Repeatable - Run 1000 times, always the same result
Traceable - Can log exactly what values were tested
Parallel-friendly - Multiple tests run simultaneously with different inputs
---------------------------------------

⚠️ Missing - Best Practices for Automation:

No Input Validation
   - What if score is negative, > 100, or not a number?
   - Automation tests expect edge case handling

5️⃣ No Input Validation - Edge Cases
❌ Current Code Accepts ANYTHING:
gradeCalculation(95);      // ✓ Valid
gradeCalculation(-50);     // ✗ Should fail but doesn't!
gradeCalculation(999);     // ✗ Should fail but doesn't!
gradeCalculation('85');    // ✗ String instead of number!
gradeCalculation(null);    // ✗ Crashes or behaves unexpectedly
gradeCalculation(true);    // ✗ Boolean converts to number!

Why It Matters in Automation:
Automation tests intentionally send bad data to find bugs:
// Reality of automated testing:
describe('Grade Calculation', () => {
    test('Valid score 95 should return A', () => {
        expect(gradeCalculation(95)).toBe('A');
    });
    
    test('Negative score should throw error', () => {
        expect(() => gradeCalculation(-50)).toThrow();  // Test expects an error!
    });
    
    test('Score > 100 should throw error', () => {
        expect(() => gradeCalculation(150)).toThrow();
    });
    
    test('Non-number input should throw error', () => {
        expect(() => gradeCalculation('abc')).toThrow();
    });
});


✅ Automation-Ready Validation:
function gradeCalculation(score) {
    // Defensive - Check everything!
    if (typeof score !== 'number') {
        throw new Error('Score must be a number');
    }
    if (score < 0 || score > 100) {
        throw new Error('Score must be between 0 and 100');
    }
    if (isNaN(score)) {
        throw new Error('Score must be a valid number');
    }
    
    if (score >= 90) return 'A';
    // ... rest of logic
}

Automation Mindset:
Test edge cases - Negative, zero, max values, wrong types
Fail fast - Throw errors for invalid input
Clear error messages - Testers know exactly what went wrong
Defensive coding - Never assume input is correct
-----------------------------------------

No Error Handling
    - Should throw or return error for invalid inputs

6️⃣ No Error Handling - Test Reliability
❌ Silent Failures:
function gradeCalculation(score) {
    if (score >= 90) {
        return 'A';
    } else if (score >= 80) {  // Now correct
        return 'B';
    } else if (score >= 70) {
        return 'C';
    } else if (score >= 60) {
        return 'D';
    } else {
        return 'F';  // But what if score is -50? Still returns 'F'!
    }
}

gradeCalculation(-50);  // Returns 'F' - silently accepts bad input!

Why Error Handling Matters:
// In automation, you want to KNOW when something is wrong:

// WITHOUT error handling:
test('Score -50 returns F', () => {
    const result = gradeCalculation(-50);
    expect(result).toBe('F');  // Test passes but shouldn't!
    // Bug: negative scores shouldn't exist!
});

// WITH error handling:
test('Negative score throws error', () => {
    expect(() => gradeCalculation(-50)).toThrow('Score must be between 0 and 100');
    // Test catches the bug!
});


✅ Proper Error Handling:
function gradeCalculation(score) {
    // Validate first
    if (typeof score !== 'number' || score < 0 || score > 100) {
        throw new Error(`Invalid score: ${score}`);
    }
    
    // Then calculate
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
}

Automation Mindset:
Fail loudly - Errors are easier to debug than silent failures
Meaningful messages - Tell the tester what went wrong
Test for failures - Automation includes negative test cases
Error as data - Use errors to verify system behavior

---------------------------------------------------
Hard to Test
    - Current structure makes it difficult to write unit tests
    - You'd have to mock console.log to validate

7️⃣ Hard to Test - Typical Automation Test
❌ Current Code's Testing Problem:
function gradeCalculation(score) {
    if (score >= 90) {
        console.log(`Your grade is 'A' -> ${score}`);  // Only logs!
    }
}

// Try to test:
test('Score 95 should give grade A', () => {
    gradeCalculation(95);
    // How do I check the result? I'd have to:
    // 1. Mock console.log
    // 2. Capture the string
    // 3. Parse it
    // WAY TOO COMPLICATED!
});

✅ Automation-Ready Structure:
function gradeCalculation(score) {
    if (typeof score !== 'number' || score < 0 || score > 100) {
        throw new Error(`Invalid score: ${score}`);
    }
    
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
}

// Simple, clear tests:
describe('Grade Calculation', () => {
    test('Score 95 returns A', () => {
        expect(gradeCalculation(95)).toBe('A');
    });
    
    test('Score 85 returns B', () => {
        expect(gradeCalculation(85)).toBe('B');
    });
    
    test('Invalid score throws error', () => {
        expect(() => gradeCalculation(-5)).toThrow();
    });
});



🎯 Summary: Automation Mindset vs Regular Coding
 Aspect- 	 |  Regular Code-	            |  Automation Code-
  Input	     |  Interactive (prompt)	    |  Passed as parameters
  Output	 |  User sees console.log	    |  Returns structured value
  Validation |	Assume input is correct	    |  Validate everything
  Errors     |  Silent failures	            |  Throw clear errors
  Testing	 |  Manual verification	        |  Automated assertions
  Edge Cases |  Ignore	                    |  Test intentionally
  Naming	 |  Can be flexible	            |  Consistent & searchable
  Logic	     |  Works most of the time	    |  Must work 100% of the time


🚀 The Automation Mindset:
Your code is done when you can write tests like this:
// Run 100 tests in parallel, all pass every time:
for (let score = 0; score <= 100; score++) {
    test(`Score ${score}`, () => {
        expect(gradeCalculation(score)).toBeDefined();
    });
}

// Invalid inputs throw errors predictably:
expect(() => gradeCalculation(-1)).toThrow();
expect(() => gradeCalculation(101)).toThrow();
expect(() => gradeCalculation('abc')).toThrow();

--------------------------------------------------------------
Doubt:
tell me what is difference of this, i understood the logic -> behind these two with or with mentioning extra logic of condition is truly needed to specify or not
} else if (score >= 80 && score < 90) {
//console.log(Your grade is 'B' -> ${score});
return 'B';
}

or this is okay??:
} else if (score >= 80) {
//console.log(Your grade is 'B' -> ${score});
return 'B';
}
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

Excellent question! This gets to the heart of defensive coding in automation. 
Let me show you the critical difference:
The Two Approaches
Approach 1: Explicit Range (BETTER for Automation) ✅
if (score >= 90) {
    return 'A';
} else if (score >= 80 && score < 90) {  // Explicit: 80-89
    return 'B';
} else if (score >= 70 && score < 80) {  // Explicit: 70-79
    return 'C';
} else if (score >= 60 && score < 70) {  // Explicit: 60-69
    return 'D';
} else {  // Everything else: 0-59
    return 'F';
}

Approach 2: Implicit Boundaries (Relies on Previous Checks) ⚠️
if (score >= 90) {
    return 'A';
} else if (score >= 80) {  // Relies on: NOT >= 90
    return 'B';           // So: 80-89 by elimination
} else if (score >= 70) {  // Relies on: NOT >= 80
    return 'C';           // So: 70-79 by elimination
} else if (score >= 60) {  // Relies on: NOT >= 70
    return 'D';           // So: 60-69 by elimination
} else {  // Everything else
    return 'F';
}

Why Approach 1 is Better for Automation
1. Self-Documenting Code
// Approach 1: Clear intent
else if (score >= 80 && score < 90) {  // "Explicitly for range 80-89"
    return 'B';
}

// Approach 2: Hidden intent
else if (score >= 80) {  // What range? You have to trace back!
    return 'B';
}

Automation Mindset: When someone reads this code (or a bug report), 
they should instantly see what range each condition handles. 
No detective work needed!

2. Catches Logic Errors During Refactoring
Imagine you refactor the order of conditions:
// ❌ BROKEN - Someone reordered conditions
if (score >= 80) {  // APPROACH 2
    return 'B';  // Now catches 80-100, not 80-89!
}
else if (score >= 90) {  // Never reaches here! Dead code!
    return 'A';
}

// ✅ SAFE - Approach 1 catches this
if (score >= 80 && score < 90) {  // Still correctly catches 80-89
    return 'B';
}
else if (score >= 90) {  // Still works!
    return 'A';
}


90 x 6
Excellent question! This gets to the heart of defensive coding in automation. Let me show you the critical difference:

The Two Approaches
Approach 1: Explicit Range (BETTER for Automation) ✅
Approach 2: Implicit Boundaries (Relies on Previous Checks) ⚠️
Why Approach 1 is Better for Automation
1. Self-Documenting Code
Automation Mindset: When someone reads this code (or a bug report), they should instantly see what range each condition handles. No detective work needed!

2. Catches Logic Errors During Refactoring
Imagine you refactor the order of conditions:

Automation Mindset: Code can be changed by different developers. 
With explicit ranges, you're protected against refactoring mistakes. 
With implicit ranges, one reordering breaks everything silently.

3. Makes Tests More Obvious
Approach 2 (Implicit):
test('Score 80 returns B', () => {
    expect(gradeCalculation(80)).toBe('B');
});

test('Score 89 returns B', () => {
    expect(gradeCalculation(89)).toBe('B');
});

// But why 80 and 89? Is the range 80-89 or 80-100?
// Have to read the code to understand!


90 x 6
Excellent question! This gets to the heart of defensive coding in automation. Let me show you the critical difference:

The Two Approaches
Approach 1: Explicit Range (BETTER for Automation) ✅
Approach 2: Implicit Boundaries (Relies on Previous Checks) ⚠️
Why Approach 1 is Better for Automation
1. Self-Documenting Code
Automation Mindset: When someone reads this code (or a bug report), they should instantly see what range each condition handles. No detective work needed!

2. Catches Logic Errors During Refactoring
Imagine you refactor the order of conditions:

Automation Mindset: Code can be changed by different developers. With explicit ranges, you're protected against refactoring mistakes. With implicit ranges, one reordering breaks everything silently.
---------------------------------------
3. Makes Tests More Obvious
Approach 2 (Implicit): -------
test('Score 80 returns B', () => {
    expect(gradeCalculation(80)).toBe('B');
});

test('Score 89 returns B', () => {
    expect(gradeCalculation(89)).toBe('B');
});

// But why 80 and 89? Is the range 80-89 or 80-100?
// Have to read the code to understand!

Approach 1 (Explicit): -------
// Test exactly matches the code condition
test('Score 80 returns B', () => {
    // We KNOW from code: score >= 80 && score < 90
    expect(gradeCalculation(80)).toBe('B');
});

test('Score 89 returns B', () => {
    expect(gradeCalculation(89)).toBe('B');
});

test('Score 90 returns A', () => {
    // Explicit boundary test - this tests the < 90 part!
    expect(gradeCalculation(90)).toBe('A');  
});
--------------------------------------

4. API/Integration Changes
Imagine the requirement changes. 
Someone says: 
"We need to handle scores differently - give special treatment to scores 85-89"

With Approach 2 (Implicit): ------
You have to trace through all conditions to understand the ranges:
// Someone new: "Where does 85-89 fall? Let me check..."
// "Is it in B? Let me trace: >= 90 (no), >= 80 (yes!) ... so B"
// Hard to modify safely!

else if (score >= 80) {  // Is this 80-89 or 80-100?
    return 'B';
}

With Approach 1 (Explicit): Crystal clear: ------
else if (score >= 80 && score < 90) {  // Obviously 80-89
    return 'B';
}

// Easy to change:
else if (score >= 85 && score < 90) {  // Change this to 85-90
    return 'B_Special';
}

--------------------------------------------
The "Works" Problem
Yes, Approach 2 works correctly in this specific case because:

1. Order is: 90+ → 80+ → 70+ → 60+ → 0-59
2. Previous conditions eliminate high values
3. So >= 80 correctly means "80 to 89"

But it's a "works by accident" situation:
// Scenario: Code review finds a bug

❌ Original (Implicit):
if (score >= 90) {
    return 'A';
} else if (score >= 80) {  // Assumes >= 90 was checked first
    return 'B';
}

Question: "What if someone removes the score >= 90 check?"
Answer: "Then score >= 80 would catch 90+, and we'd return 'B' for 90!"

✅ Explicit makes this impossible:
if (score >= 90) {
    return 'A';
} else if (score >= 80 && score < 90) {  // Shot down as 'B' even if above is removed!
    return 'B';
}

Question: "What if someone removes the score >= 90 check?"
Answer: "Doesn't matter! We still explicitly limit to < 90"


Automation Mindset Comparison
|Factor            | Implicit (>= 80)                           | Explicit (>= 80 && < 90)
 Readability	   | ❌ Have to trace logic                     | ✅ Self-documenting
 Test Clarity	   | ❌ Unclear what range is tested	           | ✅ Clear boundary testing
 Refactor Safety   | ❌ Breaks if conditions reordered	       | ✅ Safe even if reordered
 Edge Cases	       | ❌ Hidden boundaries	                   | ✅ Explicit boundaries
 Code Review	   | ❌ Hard to verify ranges	               | ✅ Easy to verify ranges
 Maintainability   | ❌ Requires understanding entire flow	   | ✅ Understandable in isolation
 Performance	   | ✅ Slightly faster (1 less check)	       | ❌ Slightly slower (1 extra check)

🎯 Real-World Scenario
You're on a team. Your colleague looks at Approach 2:
} else if (score >= 80) {
    return 'B';
}

Colleague thinks: "Oh! 80 and above is B!"

Colleague adds new feature:
} else if (score >= 85) {  // "Special bonus for 85+"
    return 'B_Gold';
} else if (score >= 80) {  // Now this catches 80-84 only
    return 'B';
}

But the original condition was supposed to be "80-89 only". With implicit ranges, this breaks!

Performance Note
Yes, Approach 2 is marginally faster (one less comparison per call), but:
-> We're talking nanoseconds
-> Automation code prioritizes correctness over micro-optimizations
-> A bug found in production costs 1000x more than the tiny performance cost

✅ Recommendation for Automation
Always use explicit ranges:
// ALWAYS do this:
} else if (score >= 80 && score < 90) {

Why?
✅ Crystal clear what the code does
✅ Safe during refactoring
✅ Easy to write boundary tests
✅ Self-documenting for teammates
✅ Prevents silent bugs
------------------------------------------------------------------

Doubt 2: 
,
you can see below different ways of passing inputs to the function, so tell me which one is best approach to deal as a automation mindset?


//  Example usage:
graadeCalculation(95);
graadeCalculation(85);
graadeCalculation(75);
graadeCalculation(65);
graadeCalculation(55);

// Test with different values:
expect(gradeCalculation(95)).toBe('A');
expect(gradeCalculation(85)).toBe('B');
expect(gradeCalculation(75)).toBe('C');


let score = prompt("Enter your score:");
//graadeCalculation(score);

if (require.main === module) {
  gradecalculation(score);
}

module.exports = { gradecalculation };

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Excellent question! This shows different use cases. 
Let me break down each approach and explain the automation mindset hierarchy:

Analyzing Each Approach
1️⃣ Direct Function Calls (Commented Out)
graadeCalculation(95);
graadeCalculation(85);
graadeCalculation(75);
graadeCalculation(65);
graadeCalculation(55);

Issues:
❌ No assertions - just runs, doesn't verify
❌ Can't use in CI/CD pipeline
❌ No test reporting
❌ Silent failures - you don't know if it worked
❌ Only for manual checking

2️⃣ Jest/Testing Assertions (BEST for Automation) ✅
expect(gradeCalculation(95)).toBe('A');
expect(gradeCalculation(85)).toBe('B');
expect(gradeCalculation(75)).toBe('C');

Why This is BEST:
✅ Verifies output - Not just running, but checking result
✅ Test framework compatible - Jest, Vitest, Mocha all work
✅ CI/CD ready - Runs in pipelines automatically
✅ Reports generated - Pass/fail clearly shown
✅ Parallel safe - Can run hundreds of tests simultaneously
✅ Automated assertions - Fails immediately if result is wrong

BUT: This is NOT production code - it's test code. 
Needs to be in a separate test file.

3️⃣ Interactive Prompt (WORST for Automation) ❌

let score = prompt("Enter your score:");
gradecalculation(score);

Why This is WRONG:
❌ Blocks execution waiting for user
❌ Can't run in CI/CD (no user interaction)
❌ Can't run in Playwright headless mode
❌ Can't be automated
❌ Can't parallel test
❌ Production bug: converts input to string (type mismatch!)

4️⃣ Entry Point Check (Good for CLI Usage) ✅
if (require.main === module) {
  gradecalculation(score);
}

What it does:
- Runs code only when file is executed directly (not imported)
- Useful for CLI tools
- Doesn't interfere with module imports

But Problem:
❌ Uses prompt() which blocks - not ideal even for CLI

5️⃣ Module Export (ESSENTIAL for Automation) ✅
module.exports = { gradecalculation };

Why This Matters:
✅ Lets other files import and test the function
✅ Separates production code from test code
✅ Can be used in different contexts

-------------------------------------------------------------

🎯 Best Automation Structure (Complete)
Here's how to organize it properly:

File 1: GradeCalculation.js (Production Code)

function gradeCalculation(score) {
    if (typeof score !== 'number' || score < 0 || score > 100) {
        throw new Error(`Invalid score: ${score}`);
    }
    if (score >= 90 && score <= 100) return 'A';
    if (score >= 80 && score < 90) return 'B';
    if (score >= 70 && score < 80) return 'C';
    if (score >= 60 && score < 70) return 'D';
    return 'F';
}

// BEST: Entry point for CLI usage
if (require.main === module) {
    // For CLI, use arguments instead of prompt()
    const score = parseInt(process.argv[2]);
    try {
        console.log(`Grade: ${gradeCalculation(score)}`);
    } catch (error) {
        console.error(error.message);
    }
}

// ESSENTIAL: Export for testing
module.exports = { gradeCalculation };

File 2: GradeCalculation.test.js (Test Code - Separate!)
const { gradeCalculation } = require('./GradeCalculation');

describe('Grade Calculation', () => {
    // Valid scores
    test('Score 95 returns A', () => {
        expect(gradeCalculation(95)).toBe('A');
    });
    
    test('Score 85 returns B', () => {
        expect(gradeCalculation(85)).toBe('B');
    });
    
    test('Score 75 returns C', () => {
        expect(gradeCalculation(75)).toBe('C');
    });
    
    test('Score 65 returns D', () => {
        expect(gradeCalculation(65)).toBe('D');
    });
    
    test('Score 55 returns F', () => {
        expect(gradeCalculation(55)).toBe('F');
    });
    
    // Boundary tests (automation mindset!)
    test('Score 90 returns A', () => {
        expect(gradeCalculation(90)).toBe('A');
    });
    
    test('Score 89 returns B', () => {
        expect(gradeCalculation(89)).toBe('B');
    });
    
    // Error cases
    test('Negative score throws error', () => {
        expect(() => gradeCalculation(-5)).toThrow();
    });
    
    test('Score > 100 throws error', () => {
        expect(() => gradeCalculation(101)).toThrow();
    });
    
    test('Non-number throws error', () => {
        expect(() => gradeCalculation('abc')).toThrow();
    });
});

🔄 How These Approaches Work Together
┌─────────────────────────────────────────────────────────────┐
│                     Production Code                          │
│  GradeCalculation.js                                         │
│  ✅ Main function with validation                            │
│  ✅ Export for testing: module.exports = { function }        │
│  ✅ CLI entry point: if (require.main === module)            │
└─────────────────────────────────────────────────────────────┘
                            ↑
                    (imported by)
                            |
    ┌───────────────────────┴───────────────────────┐
    │                                               │
    ↓                                               ↓
┌──────────────────────────┐        ┌──────────────────────────┐
│   Automated Testing      │        │    Manual Usage (CLI)     │
│  GradeCalculation.test   │        │   node GradeCalculation  │
│  ✅ Jest assertions      │        │   ✅ Direct execution    │
│  ✅ CI/CD compatible     │        │   ✅ No user interaction  │
│  ✅ Parallel safe        │        │   ✅ Command-line args   │
└──────────────────────────┘        └──────────────────────────┘

📊 Comparison Table - Automation Mindset
| Approach              |use Case           | Automation Suitability  | CI/CD Safe? | Notes
|-----------------------|-------------------|-------------------------|-------------|----------------------------------------
| Direct Function Calls |Quick Manual check | ❌ Not testable         | ❌ No      | No assertions, manual checking, only for development
| Jest Assertions       |Unit Testing       | ✅ Best for automation  | ✅ YES     | Verifies output, CI/CD ready
| Promt() Input         |Interactive App    | ❌ Worst for automation | ❌ No      | Avoid - not Automation-friendly, blocks execution
| Entry Point Check     |CLI tool           | ⚠️ Partial              | ✅ YES     | Use process.argv not prompt()
| Module Export         |Reusability        | ✅ Essential            | ✅ YES     | REQUIRED for automation


🚀 Automation Mindset Priority (Choose Combination)
Level 1: MUST HAVE 🔴
module.exports = { gradeCalculation };  // Exportable

Level 2: SHOULD HAVE 🟠
// Separate test file
expect(gradeCalculation(95)).toBe('A');  // Automated assertions

Level 3: NICE TO HAVE 🟡
if (require.main === module) {
  // CLI usage without prompt()
}

Level 4: AVOID 🔴
prompt("Enter your score:");  // Not automatable
graadeCalculation(95);  // Function calls without assertions

✅ Your Code - What Needs Fixing
From your file:

❌ Problems:
expect(gradeCalculation(95)).toBe('A');  // ← This is test syntax but NOT in a test file!
let score = prompt("Enter your score:");  // ← Not automatable
gradecalculation(score);  // ← Function name mismatch

✅ Should be:
Step 1: Fix the function itself
function gradeCalculation(score) {  // Consistent naming
    if (typeof score !== 'number' || score < 0 || score > 100) {
        throw new Error(`Invalid score: ${score}`);
    }
    // ... logic
    
    if (require.main === module) {
        const score = parseInt(process.argv[2]);
        console.log(gradeCalculation(score));
    }
    
    module.exports = { gradeCalculation };
}

Step 2: Create separate test file
// GradeCalculation.test.js
const { gradeCalculation } = require('./GradeCalculation');

describe('Grade Calculation', () => {
    test('Score 95 returns A', () => {
        expect(gradeCalculation(95)).toBe('A');
    });
    // ... more tests
});

🎯 TL;DR - Best Automation Approach
Production Code + Module Export + Separate Test File
✅ Exportable → ✅ Testable → ✅ Automatable → ✅ CI/CD Ready

Never mix:
- Production code with test code
- Manual input (prompt()) with automated code
- Function calls with assertions (should be in test file)
- That's the automation mindset! 🚀

---------------------------------------------
EXECUTION 2:
----------------------
PS F:\Automation_Upskill\PlaywrightLearning> cd tasks
PS F:\Automation_Upskill\PlaywrightLearning\tasks> node GradeCalculation.js 95
Grade: A
PS F:\Automation_Upskill\PlaywrightLearning\tasks> node GradeCalculation.js -60
Invalid score: -60
PS F:\Automation_Upskill\PlaywrightLearning\tasks> node GradeCalculation.js 70Soma
Grade: C
PS F:\Automation_Upskill\PlaywrightLearning\tasks> node GradeCalculation.js S70oma
Grade: F
PS F:\Automation_Upskill\PlaywrightLearning\tasks> node GradeCalculation.js So80ma
Grade: F
PS PS F:\Automation_Upskill\PlaywrightLearning\tasks> node GradeCalculation.js Som99a
Grade: F 

Explain this why the outputs getting Grade: F -> Insead Invalid Score?

I know something because of this 
const score = parseInt(process.argv[2])
explain what is happening here??

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

Excellent catch! This is a critical automation bug. 
Let me explain what parseInt() is doing:
-------
The Problem: How parseInt() Works
parseInt() only parses from the START of the string until it hits a non-numeric character:

parseInt("70Soma")   // → 70 (stops at 'S')
parseInt("S70oma")   // → NaN (starts with 'S', can't parse)
parseInt("So80ma")   // → NaN (starts with 'S', can't parse)
parseInt("Som99a")   // → NaN (starts with 'S', can't parse)


Why They All Return "Grade: F"
- When parseInt() fails completely (non-numeric start), it returns NaN.

The validation check passes through because of a JavaScript quirk:
const score = NaN;

if (typeof score !== 'number' || score < 0 || score > 100) {
    throw new Error(`Invalid score: ${score}`);
}

// typeof NaN === 'number' is TRUE! ✓ Passes first check!
// NaN < 0 is FALSE ✓ Passes second check!  
// NaN > 100 is FALSE ✓ Passes third check!

// So validation does NOT throw! ❌

// Then falls through to else:
return 'F';  // Everything else returns F!

The Table: What's Actually Happening
Input	| parseInt() Output	| Type Check          | Range Check	    | Result
95	    | 95	            | ✅ number	         | ✅ 0-100	     | Grade: A
-60	    | -60	            | ✅ number	         | ❌ < 0	     | ❌ ERROR
70Soma	| 70	            | ✅ number	         | ✅ 0-100	     | Grade: C
S70oma	| NaN	            | ✅ number (quirk!)	 | ✅ both false	 | Grade: F
So80ma	| NaN	            | ✅ number (quirk!)	 | ✅ both false	 | Grade: F
Som99a	| NaN	            | ✅ number (quirk!)	 | ✅ both false	 | Grade: F

Why This Happens: The NaN Quirk
typeof NaN               // "number" ← WEIRD but TRUE!
NaN < 0                  // false (not less than 0)
NaN > 100               // false (not greater than 100)
NaN === NaN             // false (NaN never equals anything, even itself!)
isNaN(NaN)              // true (proper way to check)

✅ Fix: Add isNaN() Check
Now test with the same inputs:
node GradeCalculation.js 95 ; 
node GradeCalculation.js 70Soma ; 
node GradeCalculation.js S70oma ; 
node GradeCalculation.js So80ma ; 
node GradeCalculation.js Som99a
Perfect! ✅ Now it catches the invalid inputs!

Complete Breakdown: What Was Happening
Before Fix (Broken):
After Fix (Correct):
95        → Grade: A ✓
70Soma    → Grade: C ✓ (parses 70 - still works)
S70oma    → Invalid score: NaN ✓ (CAUGHT!)
So80ma    → Invalid score: NaN ✓ (CAUGHT!)
Som99a    → Invalid score: NaN ✓ (CAUGHT!)

Why 70Soma Still Returns Grade: C
parseInt("70Soma")  // Parses 70, ignores "Soma"
// Result: 70 (valid score, safe to return C)

This is actually reasonable behavior - it stops parsing when it hits non-numeric. 
But if you want to be stricter, you could validate like this:
// STRICT: Reject any non-pure-numeric input
function validateScore(input) {
    if (!/^\d+$/.test(input)) {  // Match only digits
        throw new Error(`Invalid format: ${input}`);
    }
    const score = parseInt(input);
    if (score < 0 || score > 100) {
        throw new Error(`Invalid score: ${score}`);
    }
    return score;
}

validateScore("70Soma");   // ❌ Throws - contains letters
validateScore("70");       // ✅ Works - pure digits

🎯 Automation Mindset: What You Learned
Concept	             | Lesson
parseInt() behavior  | Only parses from start; stops at first non-digit; returns NaN if starts with non-digit
typeof NaN           | Returns "number" (JavaScript quirk!) - must check with isNaN() separately
Defensive Validation | Check isNaN() BEFORE range checks to catch malformed input
Partial Parsing      | parseInt("70Soma") returns 70 - decide if this is acceptable or too lenient
Input Sanitization   | For strict automation, validate format (regex) before parsing

✅ Best Practice for Automation:
function gradeCalculation(score) {
    // Validate EVERYTHING in correct order
    if (typeof score !== 'number') {
        throw new Error('Score must be a number');
    }
    if (isNaN(score)) {  // Catch NaN which typeof returns as 'number'
        throw new Error('Score cannot be NaN');
    }
    if (score < 0 || score > 100) {
        throw new Error('Score must be between 0 and 100');
    }
    
    // Now safe to use score
    if (score >= 90) return 'A';
    // ... etc
}

This is automation-ready! It catches:
✅ Non-numbers
✅ NaN values
✅ Out-of-range values
✅ All edge cases with clear error messages
Your current fix is working perfectly! 🚀
*/