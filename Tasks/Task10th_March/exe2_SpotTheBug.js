
let responseTimes = [320, 85, 1200, 450, 99];
let sorted = responseTimes.sort();         // ← BUG IS HERE
console.log("Fastest:", sorted[0]);
// Output: 1200  ← WRONG! 85 is actually the fastest

/*
```

### 🐛 What's Wrong?

`.sort()` with **no comparator function** converts numbers to **strings** first, then sorts alphabetically.
```
"1200" comes before "320" alphabetically because "1" < "3"
So 1200 appears first — completely wrong for numeric sorting!


✅ The Fix
*/
let responseTimes_ = [320, 85, 1200, 450, 99];

// CORRECT: Pass a comparator function (a - b = ascending order)
let sorted_ = responseTimes_.sort((a, b) => a - b);

console.log("Sorted:", sorted_);
// → [85, 99, 320, 450, 1200]

console.log("Fastest:", sorted_[0]);
// → 85  ✅ CORRECT

console.log("Slowest:", sorted_[sorted_.length - 1]);
// → 1200

// ─────────────────────────────────────────────
// 🔥 Real SDET use case — Performance threshold check
// ─────────────────────────────────────────────
function analyzePerformance(times, thresholdMs = 500) {
  const sorted = [...times].sort((a, b) => a - b); // copy first, don't mutate original!

  return {
    fastest:       sorted[0],
    slowest:       sorted[sorted.length - 1],
    median:        sorted[Math.floor(sorted.length / 2)],
    violations:    times.filter(t => t > thresholdMs),
    passedSLA:     times.every(t => t <= thresholdMs)
  };
}

console.log(analyzePerformance([320, 85, 1200, 450, 99]));
/*
{
  fastest: 85,
  slowest: 1200,
  median: 320,
  violations: [1200],
  passedSLA: false
}

```

### 🧠 Mental Model — The Sort Trap
```
.sort()           → STRING sort (dangerous for numbers)
.sort((a,b)=>a-b) → NUMERIC ascending  (smallest first = fastest)
.sort((a,b)=>b-a) → NUMERIC descending (largest first = slowest)

GOLDEN RULE: Always use [...array] to copy before sorting
             Never mutate your original test data!

*/