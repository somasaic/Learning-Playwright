

let suites1 = [{ name: "login", status: "pass" }];
let suites2 = [...suite1];           // spread operator
suites2[0].status = "fail";
console.log(suites1[0].status);      // → "fail"  😱

/*
```

### Why "fail"? — The Memory Diagram
```
SHALLOW COPY with spread [...]:

suite1 ──→ [ ref1 ]
                ↘
                 { name: "login", status: "pass" }  ← SAME OBJECT IN MEMORY
                ↗
suite2 ──→ [ ref1 ]   ← spread copies the REFERENCE, not the object itself

When you do suite2[0].status = "fail"
You're modifying the SHARED object → suite1 sees it too!



✅ The Fix — Deep Copy
*/
// ─────────────────────────────────────────────
// FIX 1: JSON parse/stringify (simple, works for plain objects)
// ─────────────────────────────────────────────
let suite1 = [{ name: "login", status: "pass" }];
let suite2 = JSON.parse(JSON.stringify(suite1));  // fully independent copy

suite2[0].status = "fail";
console.log(suite1[0].status);  // → "pass" ✅ suite1 is untouched!
console.log(suite2[0].status);  // → "fail"

// ─────────────────────────────────────────────
// FIX 2: structuredClone() — modern, preferred in Node.js 17+
// ─────────────────────────────────────────────
let suite3 = structuredClone(suite1);
suite3[0].status = "fail";
console.log(suite1[0].status);  // → "pass" ✅

// ─────────────────────────────────────────────
// FIX 3: map() with object spread — when you want to transform too
// ─────────────────────────────────────────────
let suite4 = suite1.map(test => ({ ...test }));
suite4[0].status = "fail";
console.log(suite1[0].status);  // → "pass" ✅

// ─────────────────────────────────────────────
// 🔥 Real SDET scenario — Why this DESTROYS test results
// ─────────────────────────────────────────────
// Imagine you run a test suite, save results, then re-run modified tests...

const originalResults = [
  { testId: "TC001", name: "Login Test",   status: "pass" },
  { testId: "TC002", name: "Logout Test",  status: "pass" }
];

// ❌ BUG — shallow copy, both point to same objects
const rerunResults = [...originalResults];
rerunResults[0].status = "fail";   // This ALSO changes originalResults[0]!

// ✅ FIX — deep copy preserves your baseline
const safeRerun = structuredClone(originalResults);
safeRerun[0].status = "fail";      // Only changes safeRerun, original is safe!

console.log("Original:", originalResults[0].status);  // → "pass" ✅
console.log("Re-run:  ", safeRerun[0].status);         // → "fail" ✅

/*
```

### 🧠 The Copy Mental Model for SDETs
```
WHAT YOU HAVE               COPY TYPE        SAFE FOR NESTED OBJECTS?
─────────────────────────────────────────────────────────────────────
= assignment                Reference copy   ❌ NO  (same memory address)
[...spread]                 Shallow copy     ❌ NO  (copies refs inside)
.slice() / .concat()        Shallow copy     ❌ NO
JSON.parse(JSON.stringify()) Deep copy       ✅ YES (but loses functions/dates)
structuredClone()            Deep copy       ✅ YES (modern, handles more types)
map(item => ({...item}))    1-level deep     ⚠️  ONLY if no nested objects

SDET RULE: Test result objects are ALWAYS nested → always deep copy!

*/