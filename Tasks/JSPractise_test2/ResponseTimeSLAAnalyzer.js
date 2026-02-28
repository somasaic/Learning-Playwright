/*
Problem Statement - 7

Response Time SLA Analyzer
As a performance tester, you collect API response times in milliseconds. 
Write a JavaScript program using a while loop that analyzes an array of response times and 
prints a performance report with min, max, average, and how many responses breached the SLA threshold (> 500ms). 
Use comparison operators for min/max tracking.


Input:
responseTimes = [120, 230, 450, 510, 180, 620], SLA_LIMIT = 500


Output:
Total Requests: 6 
Min Response: 120ms 
Max Response: 620ms 
SLA Breaches: 2 (33.33%) 
Overall Status: ❌ SLA VIOLATED


💡 Explanation:The while loop iterates through response times, tracking min/max and counting breaches over 500ms.
*/

function analyzeSLA(times, SLA_LIMIT) {

    let i = 0;
    let min = times[0];
    let max = times[0];
    let total = 0;
    let breaches = 0;

    while (i < times.length) {
        let value = times[i];

        if (value < min) min = value;
        if (value > max) max = value;
        if (value > SLA_LIMIT) breaches++;

        total += value;
        i++;
    }

    const avg = total / times.length;
    const breachPercent = ((breaches / times.length) * 100).toFixed(2);

    console.log(`SLA Limit      : ${SLA_LIMIT}ms`);
    console.log(`Total Requests : ${times.length}`);
    console.log(`Min Response   : ${min}ms`);
    console.log(`Max Response   : ${max}ms`);
    console.log(`Average        : ${avg.toFixed(2)}ms`);
    console.log(`SLA Breaches   : ${breaches} (${breachPercent}%)`);

    if (breaches > 0) {
        console.log("❌ SLA VIOLATED");
        process.exit(1);
    } else {
        console.log("✅ SLA MET");
    }
}


// ================= MAIN =================
if (require.main === module) {
    try {

        const args = process.argv.slice(2);

        if (args.length < 2) {
            throw new Error("Usage: node problem7.js <SLA_LIMIT> <responseTimes...>");
        }

        // Convert SLA limit
        const SLA_LIMIT = Number(args[0]);

        if (isNaN(SLA_LIMIT) || SLA_LIMIT <= 0) {
            throw new Error("SLA_LIMIT must be a positive number");
        }

        // Convert response times
        let responseTimes = [];

        for (let i = 1; i < args.length; i++) {
            let value = Number(args[i]);

            if (isNaN(value) || value < 0) {
                throw new Error(`Invalid response time: "${args[i]}"`);
            }

            responseTimes.push(value);
        }

        analyzeSLA(responseTimes, SLA_LIMIT);

    } catch (err) {
        console.error(`❌ [INPUT ERROR] ${err.message}`);
        process.exit(1);
    }
}