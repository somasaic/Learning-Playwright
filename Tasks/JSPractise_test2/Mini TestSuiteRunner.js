/*
Problem STatement - 10

Mini Test Suite Runner
Build a mini test suite runner that executes test cases and generates a summary report. 
This question combines ALL topics: var/let/const, if-else, switch, for loop, while loop, do...while, operators (===, !==, &&, ||, ??, ternary), typeof checks, and identifiers.

Each test case has a name, expected value, actual value, and 
comparison type (strictEqual, looseEqual, typeCheck, truthy, lessThan). 
Run all tests, track pass/fail/error counts, find consecutive passes from start (while loop), find first failure (do...while), 
and print a comprehensive report.


Input:
{ 
    name: "Status code is 200", 
    actual: 200, expected: 200, 
    type: "strictEqual" 
}

Output:
✅ TC-01: Status code is 200 → PASS (200 === 200) ... Pass Rate: 80.00% Overall: ❌ FAILED

💡 Explanation:Each test is evaluated based on its comparison type using switch, with results tracked via counters and reported at the end.

*/