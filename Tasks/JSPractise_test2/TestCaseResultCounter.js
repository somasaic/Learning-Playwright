
/*
Problem Statement - 2

Test Case Result Counter -
After a test suite runs, you receive an array of test results (strings: "pass", "fail", "skip"). 
Write a JavaScript program using a for loop that counts how many tests passed, failed, and were skipped. 
Print a test report with total tests, counts, pass rate percentage, 
and a verdict (all passed → ready for release, ≤2 failures → review, >2 failures → block release).

//node .\TestCaseResultCounter.js
*/

const TEST_RESULTS_TYPES = {
    PASS: "pass",
    FAIL: "fail", 
    SKIP: "skip"
};

const VERDICT_TYPES = {
    READY: "Ready for release",
    REVIEW: "Review before release",
    BLOCK: "Block release",
    SKIPPED_ONLY: "All tests skipped - review required"
}

const DEFAULT_CONFIG = {
    failureThreshold: 2,
    enableLogging: true
};

function countTestResults(testResults, config = DEFAULT_CONFIG) {
    const { failureThreshold, enableLogging } = config;
    // Validations
    if (!Array.isArray(testResults)) {
        throw new Error('Input must be an array of test results');
    }       
    if (testResults.length === 0) {
        throw new Error('Test results array cannot be empty');
    }
    for (let i = 0; i < testResults.length; i++) {
        if (typeof testResults[i] !== 'string') {
            throw new Error('All test results must be strings');
        }
    }

    // AUTOMATION BEST PRACTICE #4: Logging for Traceability & Debugging
    if (enableLogging) {
        console.log(`[INFO] Processing ${testResults.length} test results...`);
        console.log(`[INFO] Failure threshold set to: ${failureThreshold}`);
    }

    let passed = 0;
    let failed = 0;
    let skipped = 0;
    
    // ORIGINAL REQUIREMENT: Use for loop for counting
    for(let i = 0; i < testResults.length; i++) {
        if(testResults[i] === TEST_RESULTS_TYPES.PASS) {
            passed++;
        } else if(testResults[i] === TEST_RESULTS_TYPES.FAIL) {
            failed++;
        } else if(testResults[i] === TEST_RESULTS_TYPES.SKIP) {
            skipped++;
        }
    }
    
    // Calculations AFTER loop (NOT before return like the buggy code)
    let totalTests = passed + failed + skipped;
    let passRate = totalTests > 0 ? (passed / totalTests) * 100 : 0;

    // AUTOMATION BEST PRACTICE #5: Verdict Logic with Edge Cases
    let verdict = '';
    
    if(passed === 0 && failed === 0 && skipped > 0) {
        // Edge case: All tests skipped
        verdict = VERDICT_TYPES.SKIPPED_ONLY;
    } else if (failed === 0) {
        // All tests passed (no failures)
        verdict = VERDICT_TYPES.READY;
    } else if (failed <= failureThreshold) {
        // Failures <= threshold (minor issues, needs review)
        verdict = VERDICT_TYPES.REVIEW;
    } else {
        // Failures > threshold (block release)
        verdict = VERDICT_TYPES.BLOCK;
    }

    // AUTOMATION BEST PRACTICE #6: Detailed Logging Before Return
    if (enableLogging) {
        console.log(`[DEBUG] Passed: ${passed}, Failed: ${failed}, Skipped: ${skipped}`);
        console.log(`[DEBUG] Pass Rate: ${passRate.toFixed(2)}%`);
        console.log(`[DEBUG] Verdict: ${verdict}`);
    }

    // Return complete object with ALL required data
    return {
        passed,
        failed,
        skipped,
        totalTests,
        passRate,
        verdict
    };
}

// REPORT FORMATTER: Separates concerns (cleaner code)
function printTestReport(report) {
    // console.log('\n' + '='.repeat(50));
    // console.log('         TEST REPORT');
    // console.log('='.repeat(50));
    console.log(`Total Tests:    ${report.totalTests}`);
    console.log(`Passed:      ${report.passed}`);
    console.log(`Failed:      ${report.failed}`);
    console.log(`Skipped:     ${report.skipped}`);
    console.log(`Pass Rate:   ${report.passRate.toFixed(2)}%`);
    console.log(`Verdict:     ${report.verdict}`);
    // console.log('='.repeat(50) + '\n');
}

// MAIN EXECUTION
if(require.main === module) {
    //const testResults = ["pass", "fail", "pass", "skip", "fail", "pass"];   
    
    try {
        // Read CLI arguments (ignore first 2 default values)
        const testInputs = process.argv.slice(2);

        if (testInputs.length === 0) {
            throw new Error("Please provide test results as CLI arguments (pass/fail/skip)");
        }

        // Normalize input to lowercase
        const testResults = testInputs.map(arg => arg.toLowerCase());

        // Optional: Validate allowed values
        const validValues = ["pass", "fail", "skip"];
        for (let i = 0; i < testResults.length; i++) {
            if (!validValues.includes(testResults[i])) {
                throw new Error(`Invalid test result: "${testResults[i]}". Allowed values: pass, fail, skip`);
            }
        }

        // Create config with custom threshold if needed
        const config = {
            failureThreshold: 2,
            enableLogging: true
        };

        const report = countTestResults(testResults, config);
        printTestReport(report);

    } catch (error) {
        console.error(`[ERROR] ${error.message}`);
        process.exit(1); // Exit with error code for CI/CD pipelines
    }
}

module.exports = { countTestResults, printTestReport, TEST_RESULTS_TYPES, VERDICT_TYPES, DEFAULT_CONFIG };