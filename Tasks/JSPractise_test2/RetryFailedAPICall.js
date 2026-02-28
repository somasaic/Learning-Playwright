
/*
Problem Statement - 3

Retry Failed API Call
In automation testing, API calls sometimes fail due to network issues. 
Write a JavaScript program that simulates retrying a failed API call using a do...while loop. 
The program should retry a maximum of 5 times. Simulate random success/failure using Math.random() 
(40% chance of success: randomValue > 0.6). 
Log each attempt and print the final result.

Input:
MAX_ATTEMPTS = 5

Output:
Attempt 1: ❌ FAILED (Timeout/Error) 
Attempt 2: ✅ SUCCESS (Response 200 OK) 
API call PASSED after 2 attempt(s).
*/

function retryApiCall(maxAttempts) {
    if (typeof maxAttempts !== "number" || isNaN(maxAttempts) || maxAttempts <= 0) {
        throw new Error("MAX_ATTEMPTS must be a positive number");
    }

    let attempt = 1;
    let success = false;

    do {
        const randomValue = Math.random();

        if (randomValue > 0.6) {
            console.log(`Attempt ${attempt}: ✅ SUCCESS (Response 200 OK)`);
            success = true;
        } else {
            console.log(`Attempt ${attempt}: ❌ FAILED (Timeout/Error)`);
        }

        attempt++;
    } while (!success && attempt <= maxAttempts);

    if (success) {
        console.log(`API call PASSED after ${attempt - 1} attempts.`);
    } else {
        console.log(`API call FAILED after ${maxAttempts} attempts.`);
        process.exit(1);
    }
}

// MAIN
if (require.main === module) {
    try {
        const input = process.argv.slice(2);
        if (input.length !== 1) {
            throw new Error("Provide MAX_ATTEMPTS");
        }

        const maxAttempts = Number(input[0]);
        retryApiCall(maxAttempts);

    } catch (error) {
        console.error(`[ERROR] ${error.message}`);
        process.exit(1);
    }
}