// ── The Data ────────────────────────────────────────────────

var allBrowsers     = ["chromium", "firefox", "webkit"];
var blockedBrowsers = ["firefox"];


// ── The Function ─────────────────────────────────────────────

function getExecutionPlan(allBrowsers, blockedBrowsers) {

  // Step 1: Find the RUNNABLE browsers
  // filter() goes through each item → keep it only if it is NOT in blockedBrowsers
  var runnable = allBrowsers.filter(function(browser) {
    return blockedBrowsers.includes(browser) === false;
  });

  // Step 2: The BLOCKED list is already given to us — just use it directly
  var blocked = blockedBrowsers;

  // Step 3: Build the plan string
  // join() turns an array into a comma-separated string
  var plan = "Run on: " + runnable.join(", ") + " | Skip: " + blocked.join(", ");

  // Step 4: Return all three things as one object
  return {
    runnable: runnable,
    blocked:  blocked,
    plan:     plan
  };
}


// ── Run it ───────────────────────────────────────────────────

var result = getExecutionPlan(allBrowsers, blockedBrowsers);

console.log(result);
// {
//   runnable: ["chromium", "webkit"],
//   blocked:  ["firefox"],
//   plan:     "Run on: chromium, webkit | Skip: firefox"
// }

// Access individual parts
// console.log(result.runnable);  // ["chromium", "webkit"]
// console.log(result.blocked);   // ["firefox"]
// console.log(result.plan);      // "Run on: chromium, webkit | Skip: firefox"