
// ================== DEMONSTRATION 1: var HOISTING ==================
console.log("--- VAR HOISTING ---");
console.log(a); // ✅ undefined (hoisted & initialized as undefined)
var a = 10;
console.log(a); // ✅ 10


// ================== DEMONSTRATION 2: let/const TDZ ==================
console.log("\n--- LET/CONST TEMPORAL DEAD ZONE (TDZ) ---");

// EXAMPLE 1: Accessing let before declaration (TDZ)
try {
  console.log(b); // ❌ ReferenceError - accessing in TDZ
} catch (error) {
  console.log("Error caught:", error.message); // Expected: b is not defined
}
// TDZ ENDS HERE ↓
let b = 20; // Declaration line - TDZ ends, variable initialized
console.log(b); // ✅ 20


// EXAMPLE 2: Accessing const before declaration (TDZ)
try {
  console.log(c); // ❌ ReferenceError - accessing in TDZ
} catch (error) {
  console.log("Error caught:", error.message); // Expected: c is not defined
}
// TDZ ENDS HERE ↓
const c = 30; // Declaration line - TDZ ends, variable initialized
console.log(c); // ✅ 30


// ================== DEMONSTRATION 3: Block Scope & TDZ ==================
console.log("\n--- BLOCK SCOPE & TDZ DEMONSTRATION ---");

console.log(x); // ✅ undefined (var is function-scoped, hoisted globally)
var x = 100;

{
  // Inside this block, 'y' is in TDZ from block start to declaration
  try {
    console.log(y); // ❌ ReferenceError - y is hoisted but in TDZ
  } catch (error) {
    console.log("Inside block - Error:", error.message);
  }
  
  let y = 200; // TDZ ENDS HERE in this block
  console.log(y); // ✅ 200
}

// Outside block, 'y' doesn't exist
try {
  console.log(y); // ❌ ReferenceError - y is block-scoped
} catch (error) {
  console.log("Outside block - Error:", error.message);
}


// ================== DEMONSTRATION 4: Timing of TDZ ==================
console.log("\n--- TDZ START AND END ---");

console.log("Line 1: Entering block scope");
{
  console.log("Line 2: TDZ STARTS HERE for variable 'd'");
  
  // Lines 3-5: TDZ is active - accessing d will throw ReferenceError
  try {
    console.log("Line 3: Trying to access d in TDZ...");
    console.log(d);
  } catch (error) {
    console.log("Line 4: Error caught (we are IN TDZ):", error.message);
  }
  
  console.log("Line 5: Still in TDZ, d not yet declared");
  
  let d = 300; // Line 6: TDZ ENDS HERE - variable declared and initialized
  
  console.log("Line 7: Now outside TDZ, d is accessible:", d); // ✅ 300
}


// ================== DEMONSTRATION 5: const Cannot be Re-assigned ==================
console.log("\n--- CONST RE-ASSIGNMENT TEST ---");

try {
  const myConst = 50;
  console.log("Initial value:", myConst); // ✅ 50
  myConst = 60; // ❌ TypeError: Assignment to constant variable
} catch (error) {
  console.log("Error caught:", error.message);
}


// ================== SUMMARY ==================
console.log("\n--- SUMMARY ---");
console.log("1. var: Hoisted + Initialized as undefined (Function-scoped)");
console.log("2. let: Hoisted but in TDZ until declaration line (Block-scoped, No re-declaration)");
console.log("3. const: Hoisted but in TDZ until declaration line (Block-scoped, No re-declaration, No re-assignment)");
console.log("4. TDZ: Period from scope entry to declaration line - accessing throws ReferenceError");
console.log("5. TDZ Purpose: Forces you to declare before use - better code practices");