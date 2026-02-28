/*
Problem Statement - 6

Bug Severity Classifier
As a QA engineer, classify bugs based on two factors: frequency ("always", "often", "rarely") and impact ("blocker", "major", "minor"). 
Write a JavaScript program using nested if-else that prints the bug severity level.

Classification Matrix:
- always + blocker → P0 | always + major → P1 | always + minor → P2
- often + blocker → P1 | often + major → P2 | often + minor → P3
- rarely + blocker → P2 | rarely + major → P3 | rarely + minor → P4

Input:
frequency = "always", impact = "blocker"

Output:
Bug Title: Checkout page crashes on applying coupon Frequency: always Impact: blocker Severity: P0 - Critical: Stop release immediately

💡 Explanation:A bug that always occurs and is a blocker gets the highest severity P0, requiring immediate action.


*/

function classifyBug(title, frequency, impact) {

    let severity = "";

    if (frequency === "always") {
        if (impact === "blocker") severity = "P0 - Critical: Stop release immediately";
        else if (impact === "major") severity = "P1";
        else severity = "P2";
    }
    else if (frequency === "often") {
        if (impact === "blocker") severity = "P1";
        else if (impact === "major") severity = "P2";
        else severity = "P3";
    }
    else {
        if (impact === "blocker") severity = "P2";
        else if (impact === "major") severity = "P3";
        else severity = "P4";
    }

    console.log(`Bug Title: ${title}`);
    console.log(`Frequency: ${frequency}`);
    console.log(`Impact: ${impact}`);
    console.log(`Severity: ${severity}`);

    if (severity.startsWith("P0")) process.exit(1);
}

if (require.main === module) {
    try {
        const args = process.argv.slice(2);
        if (args.length < 3) throw new Error("Provide title, frequency, impact");

        const [title, frequency, impact] = args;
        classifyBug(title, frequency, impact);

    } catch (err) {
        console.error(`[ERROR] ${err.message}`);
        process.exit(1);
    }
}