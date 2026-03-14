// Step 1: Define the Higher-Order Function
function runStep(stepName, actionFn) {

  // Step 2: Log that the step is starting
  console.log("Running step: " + stepName);

  // Step 3: Call the callback function and store the result
  var result = actionFn();

  // Step 4: Build and return the result object
  return {
    stepName: stepName,
    passed: true,
    message: result
  };
}

// ── Test it ──────────────────────────────────

// Example 1: Simple callback that returns a string
var output = runStep("open dashboard", function() {
  return "Page loaded";
});

console.log(output);
// { stepName: 'open dashboard', passed: true, message: 'Page loaded' }


// Example 2: A different step
var output2 = runStep("click login button", function() {
  return "Button clicked";
});

console.log(output2);
// { stepName: 'click login button', passed: true, message: 'Button clicked' }