
/*
✅ Exercise 1 — API Response Validation
A. Concept Explanation
You have an array of HTTP status codes. You need to:

Check if ALL are 200–299 (success)
Find the FIRST non-success code
Return unique error codes only

*/

let responses = [200, 201, 404, 500, 404, 200, 503];

// ─────────────────────────────────────────────
// TASK 1: Check if ALL responses are successful
// ─────────────────────────────────────────────
// every() — returns true ONLY if ALL elements pass the condition
// Like a strict QA gate: one failure = entire batch fails

const allSuccessful = responses.every(code => code >= 200 && code <= 299);
console.log("All responses successful?", allSuccessful);
// → false  (because 404, 500, 503 exist)

// ─────────────────────────────────────────────
// TASK 2: Find the FIRST non-success code
// ─────────────────────────────────────────────
// find() — stops at the FIRST match and returns that element
// Like a QA engineer scanning a log and flagging the first anomaly

const firstError = responses.find(code => code < 200 || code > 299);
console.log("First non-success code:", firstError);
// → 404

// ─────────────────────────────────────────────
// TASK 3: Return ALL UNIQUE error codes
// ─────────────────────────────────────────────
// Step 1: filter() — keep only error codes
// Step 2: Set — automatically removes duplicates (a Set holds only unique values)
// Step 3: Spread [...] — convert Set back to array

const allErrors = responses.filter(code => code < 200 || code > 299);
// → [404, 500, 404, 503]  (duplicates still here)

const uniqueErrors = [...new Set(allErrors)];
console.log("Unique error codes:", uniqueErrors);
// → [404, 500, 503]

// ─────────────────────────────────────────────
// 🔥 COMBINED — Production-style function
// ─────────────────────────────────────────────
function validateAPIResponses(responses) {
  const isSuccess = code => code >= 200 && code <= 299;

  return {
    allSuccessful:  responses.every(isSuccess),
    firstError:     responses.find(code => !isSuccess(code)),
    uniqueErrors:  [...new Set(responses.filter(code => !isSuccess(code)))]
  };
}

const result = validateAPIResponses([200, 201, 404, 500, 404, 200, 503]);
console.log(result);
/*
{
  allSuccessful: false,
  firstError: 404,
  uniqueErrors: [404, 500, 503]
}
*/

/*
```

### 🧠 Mental Model
```
every()  → "Is the ENTIRE array clean?"    → QA gate check
find()   → "Where did it FIRST break?"     → First failure locator
filter() → "Give me ALL the bad ones"      → Error collector
Set      → "Deduplicate the noise"         → Unique issue tracker

*/