// ── The Raw Input ────────────────────────────────────────────

var rawMessage = "  Locator not found after   TIMEOUT  ";
//               ↑ extra spaces at start       ↑ extra spaces  ↑ trailing space


// ── The Function ─────────────────────────────────────────────

function normalizeError(rawMessage) {

  // Step 1: trim() → removes spaces from START and END only
  var step1 = rawMessage.trim();
  // "  Locator not found after   TIMEOUT  "
  // → "Locator not found after   TIMEOUT"

  // Step 2: toLowerCase() → converts everything to lowercase
  var step2 = step1.toLowerCase();
  // → "locator not found after   timeout"

  // Step 3: collapse multiple spaces into ONE space
  // replace() with a regex finds the pattern, replaces it
  // /  +/g  means: find 2 or more spaces, everywhere in the string
  var step3 = step2.replace(/  +/g, " ");
  // → "locator not found after timeout"

  // Step 4: Decide the category — ORDER MATTERS (timeout wins)
  var category;

  if (step3.includes("timeout")) {
    category = "TIMEOUT";               // checked FIRST — highest priority
  } else if (step3.includes("locator")) {
    category = "LOCATOR";
  } else {
    category = "GENERAL";
  }

  // Step 5: Print the result
  console.log("Normalized: " + step3);
  console.log("Category: "   + category);

  // Step 6: Return both values as an object
  return {
    normalized: step3,
    category:   category
  };
}


// ── Run it ───────────────────────────────────────────────────

var result = normalizeError(rawMessage);

// Console output:
// Normalized: locator not found after timeout
// Category: TIMEOUT

// console.log(result);
// { normalized: "locator not found after timeout", category: "TIMEOUT" }