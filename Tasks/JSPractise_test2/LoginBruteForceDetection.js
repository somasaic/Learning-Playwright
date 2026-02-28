/*
Problem Statement - 9

Login Brute-Force Detection
Write a JavaScript program that simulates a login system with brute-force detection. 
The system should lock the account after 3 consecutive failed attempts. 
Use a do...while loop to process login attempts from an array. 
Demonstrate var (global counter), let (loop variables), and const (credentials and threshold). 
Validate using strict equality (===) and logical operators (&&).


Input:
Valid: admin@testingacademy.com / Test@1234 Attempts: [wrong, wrong, wrong, correct]

Output:
Attempt 1: ❌ FAILED - Strike 1/3 
Attempt 2: ❌ FAILED - Strike 2/3 
Attempt 3: ❌ FAILED - Strike 3/3 
🚨 ACCOUNT LOCKED 
Attempt 4: 🔒 ACCOUNT LOCKED - Rejected


💡 Explanation:After 3 consecutive failures, the account is locked. Even correct credentials on attempt 4 are rejected.



*/

function loginTest(attempts) {
    const EXPECTED_USER = "admin@testingacademy.com";
    const EXPECTED_PASS = "Test@1234";
    const MAX_STRIKES = 3;

    var strikeCount = 0;          // global-style counter (demonstrates `var`)
    let attemptIdx = 0;           // loop variable (demonstrates `let`)

    const results = [];

    do {
        const { username, password } = attempts[attemptIdx];

        // lockout check – must run before credential check
        if (strikeCount >= MAX_STRIKES) {
            console.log(`Attempt ${attemptIdx + 1}: 🔒 ACCOUNT LOCKED - Rejected`);
            results.push({ attempt: attemptIdx + 1, status: "LOCKED", message: "ACCOUNT LOCKED - Rejected" });
            attemptIdx++;
            continue;
        }

        // credential validation (strict equality &&)
        if (username === EXPECTED_USER && password === EXPECTED_PASS) {
            console.log(`Attempt ${attemptIdx + 1}: ✅ SUCCESS`);
            results.push({ attempt: attemptIdx + 1, status: "SUCCESS" });
            break;
        } else {
            strikeCount++;
            console.log(`Attempt ${attemptIdx + 1}: ❌ FAILED - Strike ${strikeCount}/${MAX_STRIKES}`);
            results.push({ attempt: attemptIdx + 1, status: "FAILED", strike: strikeCount });
        }

        // lockout message after the strike that reaches the threshold
        if (strikeCount === MAX_STRIKES) {
            console.log(`🚨 ACCOUNT LOCKED`);
            results.push({ event: "LOCKED", message: "ACCOUNT LOCKED" });
        }

        attemptIdx++;
    } while (attemptIdx < attempts.length); // driven by input array

    return results;
}

if (require.main === module) {
    try {
        const args = process.argv.slice(2);
        let attempts = [];

        if (args.length === 0) {
            throw new Error(
                "Usage: node LoginBruteForceDetection.js '<jsonArrayOfAttempts>'\n" +
                "       Example: node LoginBruteForceDetection.js '[{\"username\":\"wrong\",\"password\":\"bad\"},{\"username\":\"admin@testingacademy.com\",\"password\":\"Test@1234\"}]'\n" +
                "       OR\n" +
                "       Usage: node LoginBruteForceDetection.js <username1> <password1> [<username2> <password2> ...]\n" +
                "       Example: node LoginBruteForceDetection.js wrong bad admin@testingacademy.com Test@1234"
            );
        }

        // Try parsing as JSON array first if there's only one argument
        if (args.length === 1) {
            try {
                const parsed = JSON.parse(args[0]);
                if (Array.isArray(parsed)) {
                    attempts = parsed.map(item => ({
                        username: item.username ?? item.u,
                        password: item.password ?? item.p
                    }));
                } else {
                    // If it's not an array, it's not the expected JSON format for attempts
                    throw new Error("Single argument must be a JSON array of login attempts.");
                }
            } catch (e) {
                // If JSON parsing fails, it's not a valid JSON array
                throw new Error("Failed to parse JSON array of attempts. Ensure it is valid JSON.");
            }
        } else if (args.length > 1) {
            // Assume flat arguments: username1 password1 username2 password2 ...
            if (args.length % 2 !== 0) {
                throw new Error("When providing flat arguments, each username must have a corresponding password.");
            }
            for (let i = 0; i < args.length; i += 2) {
                attempts.push({ username: args[i], password: args[i + 1] });
            }
        }

        if (!Array.isArray(attempts) || attempts.length === 0) {
            throw new Error("The attempts array must contain at least one login object.");
        }

        const outcome = loginTest(attempts);

    } catch (error) {
        console.error(`[INPUT ERROR] ${error.message}`);
        process.exit(1);
    }
}

module.exports = { loginTest };