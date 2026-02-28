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

const testCases = [
  { name: "Status code is 200", actual: 200, expected: 200, type: "strictEqual" },
  { name: "Content-Type header", actual: "application/json", expected: "application/json", type: "strictEqual" },
  { name: "User object is present", actual: { id: 1 }, expected: null, type: "truthy" },
  { name: "Response time within limit", actual: 250, expected: 200, type: "lessThan" }, // Should fail
  { name: "ID matches loosely", actual: "123", expected: 123, type: "looseEqual" }
];

let passCount = 0;
let failCount = 0;
let errorCount = 0;

const detailedResults = [];

for (let i = 0; i < testCases.length; i++) {
  const test = testCases[i];
  let isPassed = false;

  try {

    switch (test.type) {

      case "strictEqual":
        isPassed = (test.actual === test.expected);
        break;

      case "looseEqual":
        isPassed = (test.actual == test.expected);
        break;

      case "typeCheck":
        isPassed = (typeof test.actual === test.expected);
        break;

      case "truthy":
        isPassed = !!test.actual;
        break;

      case "lessThan":
        isPassed = (test.actual < test.expected);
        break;

      default:
        throw new Error("Unsupported test type");
    }

    isPassed ? passCount++ : failCount++;

  } catch (err) {
    errorCount++;
  }

  detailedResults.push({
    name: test.name,
    passed: isPassed,
    type: test.type
  });
}

// WHILE → consecutive passes
let consecutivePasses = 0;
let index = 0;

while (index < detailedResults.length && detailedResults[index].passed) {
  consecutivePasses++;
  index++;
}

// DO-WHILE → first failure
let firstFailureIndex = -1;
let j = 0;

if (detailedResults.length > 0) {
  do {
    if (!detailedResults[j].passed) {
      firstFailureIndex = j;
      break;
    }
    j++;
  } while (j < detailedResults.length);
}

const total = testCases.length;
const passRate = ((passCount / total) * 100).toFixed(2);
const overall = (failCount === 0 && errorCount === 0) ? "PASSED" : "FAILED";

console.log("Pass:", passCount);
console.log("Fail:", failCount);
console.log("Errors:", errorCount);
console.log("Pass Rate:", passRate + "%");
console.log("Overall:", overall);
console.log("Consecutive Passes:", consecutivePasses);
console.log("First Failure Index:", firstFailureIndex);