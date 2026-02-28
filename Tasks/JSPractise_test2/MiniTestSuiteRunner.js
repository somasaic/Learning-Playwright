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

/**
 * Mini Test Suite Runner
 * Accepts a JSON string via CLI argument representing an array of test cases.
 * Each test case shape:
 *   {
 *     name: string,
 *     actual: any,
 *     expected: any,
 *     type: 'strictEqual' | 'looseEqual' | 'typeCheck' | 'truthy' | 'lessThan'
 *   }
 */

function evaluateTest(test) {
    const { actual, expected, type } = test;
    switch (type) {
        case 'strictEqual':
            return actual === expected;
        case 'looseEqual':
            // eslint-disable-next-line eqeqeq
            return actual == expected;
        case 'typeCheck':
            return typeof actual === expected;
        case 'truthy':
            return Boolean(actual);
        case 'lessThan':
            return actual < expected;
        default:
            throw new Error(`Unsupported comparison type: ${type}`);
    }
}

function runSuite(testCases) {
    let passCount = 0;
    let failCount = 0;
    let errorCount = 0;
    const results = [];

    // Execute each test case
    for (let i = 0; i < testCases.length; i++) {
        const test = testCases[i];
        try {
            const passed = evaluateTest(test);
            if (passed) {
                passCount++;
                results.push(`✅ ${test.name} → PASS (${formatComparison(test)})`);
            } else {
                failCount++;
                results.push(`❌ ${test.name} → FAIL (${formatComparison(test)})`);
            }
        } catch (e) {
            errorCount++;
            results.push(`⚠️ ${test.name} → ERROR (${e.message})`);
        }
    }

    // Find consecutive passes from start using while loop
    let consecutivePasses = 0;
    let idx = 0;
    while (idx < testCases.length && evaluateTest(testCases[idx])) {
        consecutivePasses++;
        idx++;
    }

    // Find first failure using do...while loop
    let firstFailureIndex = -1;
    let i = 0;
    if (testCases.length > 0) {
        do {
            const passed = evaluateTest(testCases[i]);
            if (!passed) {
                firstFailureIndex = i;
                break;
            }
            i++;
        } while (i < testCases.length);
    }

    const total = testCases.length;
    const passRate = total ? (passCount / total) * 100 : 0;
    const overallStatus = failCount === 0 && errorCount === 0 ? '✅ PASSED' : '❌ FAILED';

    // Build report
    console.log('--- Test Suite Report ---');
    results.forEach(r => console.log(r));
    console.log('--- Summary ---');
    console.log(`Total: ${total}`);
    console.log(`Pass: ${passCount}`);
    console.log(`Fail: ${failCount}`);
    console.log(`Error: ${errorCount}`);
    console.log(`Pass Rate: ${passRate.toFixed(2)}%`);
    console.log(`Overall: ${overallStatus}`);
    console.log(`Consecutive Passes from start: ${consecutivePasses}`);
    if (firstFailureIndex !== -1) {
        console.log(`First failure at index ${firstFailureIndex} (Test: ${testCases[firstFailureIndex].name})`);
    } else {
        console.log('No failures detected');
    }
}

function formatComparison(test) {
    const { actual, expected, type } = test;
    switch (type) {
        case 'strictEqual':
            return `${actual} === ${expected}`;
        case 'looseEqual':
            return `${actual} == ${expected}`;
        case 'typeCheck':
            return `typeof ${actual} === '${expected}'`;
        case 'truthy':
            return `Boolean(${actual})`;
        case 'lessThan':
            return `${actual} < ${expected}`;
        default:
            return '';
    }
}

if (require.main === module) {
    const inputStr = process.argv[2];
    if (!inputStr) {
        console.error('Error: Test cases JSON string required as first argument');
        process.exit(1);
    }
    let testCases;
    try {
        testCases = JSON.parse(inputStr);
        if (!Array.isArray(testCases)) {
            throw new Error('Input JSON must be an array of test case objects');
        }
    } catch (e) {
        console.error('Error parsing input JSON:', e.message);
        process.exit(1);
    }
    runSuite(testCases);
}