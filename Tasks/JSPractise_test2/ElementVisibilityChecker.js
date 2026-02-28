
/*
Problem Statement 4 -

Element Visibility Checker
In UI automation (Cypress/Playwright), you often need to validate element states before interacting with them. 
Write a JavaScript program that checks an element's properties (isPresent, isDisplayed, isEnabled) and 
prints the appropriate action a QA engineer should take. 
Use strict equality (===), logical operators (&&, ||), and the ternary operator for severity level.

States: READY (all true), DISABLED (present+displayed but not enabled), HIDDEN (present but not displayed), 
NOT FOUND (not present).
Severity: CRITICAL (not present), WARNING (not displayed or not enabled), OK (all good).

Input:
isPresent = true, isDisplayed = true, isEnabled = false

Output:
Status: DISABLED Severity: WARNING Action: Element is visible but disabled. 
Wait for enable state or check preconditions.

💡 Explanation:Element is present and displayed but not enabled. Severity is WARNING because it's not fully interactable.

*/

function checkElementState(isPresent, isDisplayed, isEnabled) {

    let status = "";
    let severity = "";
    let action = "";

    if (isPresent === true && isDisplayed === true && isEnabled === true) {
        status = "READY";
        severity = "OK";
        action = "Safe to interact.";
    }
    else if (isPresent === true && isDisplayed === true && isEnabled === false) {
        status = "DISABLED";
        severity = "WARNING";
        action = "Element is visible but disabled. Wait for enable state or check preconditions.";
    }
    else if (isPresent === true && isDisplayed === false) {
        status = "HIDDEN";
        severity = "WARNING";
        action = "Element present but hidden. Investigate UI conditions.";
    }
    else if (isPresent === false) {
        status = "NOT FOUND";
        severity = "CRITICAL";
        action = "Locator issue or page not loaded.";
    }

    console.log(`Status   : ${status}`);
    console.log(`Severity : ${severity}`);
    console.log(`Action   : ${action}`);

    // CI/CD Fail condition
    if (severity === "CRITICAL") {
        process.exit(1);
    }
}


// ================= MAIN =================
if (require.main === module) {

    try {
        const args = process.argv.slice(2);

        if (args.length !== 3) {
            throw new Error("Provide exactly 3 boolean values: true/false true/false true/false");
        }

        // Normalize input
        const normalizedArgs = args.map(arg => arg.toLowerCase());

        const allowedValues = ["true", "false"];

        for (let i = 0; i < normalizedArgs.length; i++) {
            if (!allowedValues.includes(normalizedArgs[i])) {
                throw new Error(
                    `Invalid boolean value: "${args[i]}". Allowed values: true or false`
                );
            }
        }

        let values = [];

        for (let i = 0; i < normalizedArgs.length; i++) {

            if (normalizedArgs[i] === "true") {
                values[i] = true;
            } else {
                values[i] = false;
            }

        }

        checkElementState(values[0], values[1], values[2]);

    } catch (error) {
        console.error(`[INPUT ERROR] ${error.message}`);
        process.exit(1);
    }
}