// ── The Data ─────────────────────────────────────────────────

var results = [
  { name: "open login", status: "passed",  durationMs: 400 },
  { name: "fill form",  status: "failed",  durationMs: 700 },
  { name: "submit",     status: "skipped", durationMs: 0   }
];


// ── The Function ─────────────────────────────────────────────

function generateSummary(results) {

  // Step 1: Set up all counters BEFORE the loop
  var totalSteps    = results.length;  // we already know this: 3
  var passedCount   = 0;
  var failedCount   = 0;
  var skippedCount  = 0;
  var totalDuration = 0;
  var failedNames   = [];              // collect failed step names here

  // Step 2: Loop through every result object
  for (var i = 0; i < results.length; i++) {

    var step = results[i];  // grab the current object

    // Step 3: Add this step's duration to the running total
    totalDuration = totalDuration + step.durationMs;

    // Step 4: Check status and update the right counter
    if (step.status === "passed") {
      passedCount = passedCount + 1;

    } else if (step.status === "failed") {
      failedCount = failedCount + 1;
      failedNames.push(step.name);     // also save the name

    } else if (step.status === "skipped") {
      skippedCount = skippedCount + 1;
    }
  }

  // Step 5: Build the failed steps string
  // join() turns ["fill form"] → "fill form"
  // If no failures → failedNames = [] → join gives ""
  var failedList = failedNames.join(", ");

  // Step 6: Print the summary report
  console.log("Total Steps: "    + totalSteps);
  console.log("Passed: "         + passedCount);
  console.log("Failed: "         + failedCount);
  console.log("Skipped: "        + skippedCount);
  console.log("Total Duration: " + totalDuration + "ms");
  console.log("Failed Steps: "   + failedList);

  // Step 7: Return everything as one object
  return {
    totalSteps:    totalSteps,
    passedCount:   passedCount,
    failedCount:   failedCount,
    skippedCount:  skippedCount,
    totalDuration: totalDuration,
    failedSteps:   failedList
  };
}


// ── Run it ───────────────────────────────────────────────────

var summary = generateSummary(results);

// Console output:
// Total Steps:    3
// Passed:         1
// Failed:         1
// Skipped:        1
// Total Duration: 1100ms
// Failed Steps:   fill form