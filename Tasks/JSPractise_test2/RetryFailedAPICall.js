
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
Attempt 1: FAILED (Timeout/Error) 
Attempt 2: SUCCESS (Response 200 OK) 
API call PASSED after 2 attempt(s).
*/


function retryApiCall(maxAttempts) {
    let attempt = 0;
    let isSuccess = false;

    do {
        attempt++;
        const randomValue = Math.random();

        if (randomValue > 0.6) {
            isSuccess = true;
            console.log(`Attempt ${attempt}/${maxAttempts}: SUCCESS (Response 200 OK)`);
        } else {
            console.log(`Attempt ${attempt}/${maxAttempts}: FAILED (Timeout/Error)`);
        }

    } while (!isSuccess && attempt < maxAttempts);

    if (isSuccess) {
        console.log(`\nAPI call PASSED after ${attempt} attempt(s).`);
    } else {
        console.log(`\nAPI call FAILED after ${maxAttempts} attempts.`);
    }
}

retryApiCall(5);