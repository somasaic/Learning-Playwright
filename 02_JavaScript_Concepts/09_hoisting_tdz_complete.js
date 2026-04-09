// ========================================
// COMPLETE HOISTING & TDZ PRACTICAL EXAMPLES
// ========================================

console.log("\n================================");
console.log("SECTION 1: OPERATORS vs OPERANDS");
console.log("================================\n");

// Example 1: Arithmetic Operators
console.log("--- Arithmetic Operators ---");
let a = 10;
let b = 5;
console.log("a = 10, b = 5");
console.log("a + b:", a + b);  // '+' is operator, a & b are operands
console.log("a - b:", a - b);  // '-' is operator, a & b are operands
console.log("a * b:", a * b);  // '*' is operator, a & b are operands
console.log("a / b:", a / b);  // '/' is operator, a & b are operands
console.log("a % b:", a % b);  // '%' is operator, a & b are operands
console.log("a ** b:", a ** b); // '**' is operator, a & b are operands

// Example 2: Comparison Operators
console.log("\n--- Comparison Operators ---");
console.log("a === b:", a === b);  // '===' is operator
console.log("a !== b:", a !== b);  // '!==' is operator
console.log("a < b:", a < b);      // '<' is operator
console.log("a > b:", a > b);      // '>' is operator

// Example 3: Logical Operators
console.log("\n--- Logical Operators ---");
let isAdult = true;
let hasLicense = false;
console.log("isAdult && hasLicense:", isAdult && hasLicense);  // '&&' operator
console.log("isAdult || hasLicense:", isAdult || hasLicense);  // '||' operator
console.log("!isAdult:", !isAdult);                            // '!' operator

// Example 4: Unary Operators
console.log("\n--- Unary Operators ---");
let count = 5;
console.log("count:", count);
console.log("++count:", ++count);   // '++' operator, count is operand
console.log("--count:", --count);   // '--' operator, count is operand
console.log("+count:", +count);     // '+' unary operator
console.log("-count:", -count);     // '-' unary operator

console.log("\n================================");
console.log("SECTION 2: VAR HOISTING SCENARIOS");
console.log("================================\n");

// Scenario 1: Var in Global Scope
console.log("--- Scenario 1: Var in Global Scope ---");
console.log("1. Access before declaration:", globalVar1);  // undefined (hoisted)
var globalVar1 = "Hello";
console.log("2. Access after declaration:", globalVar1);   // "Hello"
globalVar1 = "World";
console.log("3. After reassignment:", globalVar1);         // "World"

// Scenario 2: Var in Function Scope
console.log("\n--- Scenario 2: Var in Function Scope ---");
function testVarFunction() {
  console.log("  Inside function - before:", localVar1);   // undefined (hoisted inside function)
  var localVar1 = "Inside";
  console.log("  Inside function - after:", localVar1);    // "Inside"
}
testVarFunction();
console.log("Outside function - typeof localVar1:", typeof localVar1);  // "undefined"

// Scenario 3: Var in If-Else Block (Global Context)
console.log("\n--- Scenario 3: Var in If-Else Block (Global) ---");
console.log("1. Before if-else:", blockVar1);  // undefined (hoisted to global)
if (true) {
  console.log("2. Inside if - before:", blockVar1);   // undefined
  var blockVar1 = "Inside If";
  console.log("3. Inside if - after:", blockVar1);    // "Inside If"
}
console.log("4. After if-else:", blockVar1);  // "Inside If" (still exists!)

// Scenario 4: Var in If-Else Block (Inside Function)
console.log("\n--- Scenario 4: Var in If-Else Block (Inside Function) ---");
function withVarIfBlock() {
  console.log("  Start of function:", conditionVar1);  // undefined (hoisted to function top)
  if (true) {
    console.log("  Inside if - before:", conditionVar1);    // undefined
    var conditionVar1 = "Set in if";
    console.log("  Inside if - after:", conditionVar1);     // "Set in if"
  }
  console.log("  After if block:", conditionVar1);  // "Set in if" (function scope)
}
withVarIfBlock();

// Scenario 5: Var Re-declaration
console.log("\n--- Scenario 5: Var Re-declaration ---");
var name1 = "John";
console.log("1. First declaration:", name1);      // "John"
var name1 = "Jane";  // ✅ Re-declaration allowed
console.log("2. After re-declaration:", name1);   // "Jane"

// Scenario 6: Var in For Loop
console.log("\n--- Scenario 6: Var in For Loop ---");
for (var i_var = 0; i_var < 3; i_var++) {
  console.log("  Loop iteration (var):", i_var);
}
console.log("After loop - i_var:", i_var);  // 3 (still exists! escaped loop)

console.log("\n================================");
console.log("SECTION 3: LET HOISTING & TDZ");
console.log("================================\n");

// Scenario 1: Let in Global Scope
console.log("--- Scenario 1: Let in Global Scope (TDZ) ---");
try {
  console.log("1. TDZ active - accessing globalLet1:", globalLet1);
  // ❌ Would throw ReferenceError here (in TDZ)
  // Commented out to continue execution
} catch (error) {
  console.log("  Error caught:", error.message);
}
let globalLet1 = "Hello";  // TDZ ENDS HERE
console.log("2. TDZ ended - globalLet1:", globalLet1);  // "Hello"

// Scenario 2: Let in Function Scope
console.log("\n--- Scenario 2: Let in Function Scope (TDZ) ---");
function testLetFunction() {
  try {
    console.log("  TDZ active - accessing localLet1:", localLet1);
    // ❌ Would throw ReferenceError here (in TDZ)
    // Commented out to continue execution
  } catch (error) {
    console.log("  Error caught:", error.message);
  }
  let localLet1 = "Inside Function";  // TDZ ENDS HERE
  console.log("  TDZ ended - localLet1:", localLet1);  // "Inside Function"
}
testLetFunction();

// Scenario 3: Let in If-Else Block
console.log("\n--- Scenario 3: Let in If-Else Block (TDZ) ---");
console.log("1. Outside if - checking blockLet1:", typeof blockLet1);  // "undefined" (doesn't exist in global)
if (true) {
  try {
    console.log("2. Inside if - TDZ active for blockLet1:", blockLet1);
    // ❌ Would throw ReferenceError here (in TDZ)
    // Commented out to continue execution
  } catch (error) {
    console.log("  Error caught:", error.message);
  }
  let blockLet1 = "Inside Block";  // TDZ ENDS HERE (inside block scope)
  console.log("3. Inside if - after declaration:", blockLet1);  // "Inside Block"
}
console.log("4. Outside if - blockLet1 exists?:", typeof blockLet1);  // "undefined" (block-scoped)

// Scenario 4: Let in Block Scope with Shadowing
console.log("\n--- Scenario 4: Let Block Scope & Shadowing ---");
let shadowLet = "Global";
console.log("1. Global scope:", shadowLet);  // "Global"
{
  let shadowLet = "Block 1";  // NEW binding (shadows global)
  console.log("2. Block 1:", shadowLet);     // "Block 1"
}
{
  let shadowLet = "Block 2";  // NEW binding (shadows global)
  console.log("3. Block 2:", shadowLet);     // "Block 2"
}
console.log("4. Back to global:", shadowLet);  // "Global"

// Scenario 5: Let in For Loop (per-iteration binding)
console.log("\n--- Scenario 5: Let in For Loop (per-iteration binding) ---");
console.log("Each iteration has its own 'i' binding:");
for (let i_let = 0; i_let < 3; i_let++) {
  console.log("  Iteration:", i_let);
}
try {
  console.log("After loop - i_let exists?:", i_let);
} catch (error) {
  console.log("  Error (expected):", error.message);  // ReferenceError: i_let is not defined
}

// Scenario 6: Let Re-assignment (allowed)
console.log("\n--- Scenario 6: Let Re-assignment (Allowed) ---");
let reassignable = 10;
console.log("1. Initial value:", reassignable);  // 10
reassignable = 20;  // ✅ Re-assignment allowed
console.log("2. After reassignment:", reassignable);  // 20

console.log("\n================================");
console.log("SECTION 4: CONST HOISTING & TDZ");
console.log("================================\n");

// Scenario 1: Const in Global Scope
console.log("--- Scenario 1: Const in Global Scope (TDZ) ---");
try {
  console.log("1. TDZ active - accessing PI:", PI);
  // ❌ Would throw ReferenceError here (in TDZ)
  // Commented out to continue execution
} catch (error) {
  console.log("  Error caught:", error.message);
}
const PI = 3.14159;  // TDZ ENDS HERE
console.log("2. TDZ ended - PI:", PI);  // 3.14159

// Scenario 2: Const Cannot Be Reassigned
console.log("\n--- Scenario 2: Const Cannot Be Reassigned ---");
const MAX_USERS = 100;
console.log("1. Initial value:", MAX_USERS);  // 100
try {
  MAX_USERS = 200;  // ❌ Try to reassign
} catch (error) {
  console.log("2. Error caught:", error.message);  // TypeError
}

// Scenario 3: Const Object Properties Can Change
console.log("\n--- Scenario 3: Const Object Properties Can Change ---");
const user = { name: "John", age: 30 };
console.log("1. Initial:", user);  // { name: 'John', age: 30 }
user.name = "Jane";  // ✅ Modify property
user.age = 31;       // ✅ Modify property
console.log("2. After property changes:", user);  // { name: 'Jane', age: 31 }
try {
  user = {};  // ❌ Try to reassign reference
} catch (error) {
  console.log("3. Error caught:", error.message);  // TypeError
}

// Scenario 4: Const in If-Else Block
console.log("\n--- Scenario 4: Const in If-Else Block (TDZ) ---");
try {
  console.log("1. TDZ - accessing localConst1:", localConst1);
  // ❌ Would throw ReferenceError here (in TDZ)
  // Commented out to continue execution
} catch (error) {
  console.log("  Error caught:", error.message);
}
const localConst1 = 42;  // TDZ ENDS HERE
console.log("2. TDZ ended - localConst1:", localConst1);  // 42

// Scenario 5: Const Array Can Be Modified
console.log("\n--- Scenario 5: Const Array Can Be Modified ---");
const arr = [1, 2, 3];
console.log("1. Initial array:", arr);  // [1, 2, 3]
arr[0] = 99;  // ✅ Modify element
arr.push(4);  // ✅ Add element
console.log("2. After modifications:", arr);  // [99, 2, 3, 4]
try {
  arr = [];  // ❌ Try to reassign reference
} catch (error) {
  console.log("3. Error caught:", error.message);  // TypeError
}

console.log("\n================================");
console.log("SECTION 5: COMPARISON");
console.log("================================\n");

// Complete Comparison
console.log("--- Complete Comparison Table ---\n");
console.log("| Feature          | var     | let     | const   |");
console.log("|---|---|---|---|");
console.log("| Hoisted?         | ✅ Yes  | ✅ Yes  | ✅ Yes  |");
console.log("| Initialized?     | ✅ undef| ❌ TDZ  | ❌ TDZ  |");
console.log("| Scope            | Function| Block   | Block   |");
console.log("| Before decl?     | ✅ undef| ❌ Error| ❌ Error|");
console.log("| Re-declare?      | ✅ Yes  | ❌ No   | ❌ No   |");
console.log("| Re-assign?       | ✅ Yes  | ✅ Yes  | ❌ No   |");
console.log("| TDZ?             | ❌ No   | ✅ Yes  | ✅ Yes  |");

console.log("\n--- Usage Example ---\n");

// Best practice example
const API_URL = "https://api.example.com";  // Constant - won't change
const MAX_RETRIES = 3;                      // Constant - won't change
const calculateSum = (a, b) => a + b;       // Function (constant reference)

let retryCount = 0;  // Will change through iterations
while (retryCount < MAX_RETRIES) {
  console.log("Retry attempt:", retryCount);
  retryCount++;
}

// Never use var in modern code:
// ❌ var legacyCode = "avoid";

console.log("\n================================");
console.log("SECTION 6: TDZ DEMONSTRATION");
console.log("================================\n");

console.log("--- Clear TDZ Timeline ---\n");

{
  console.log("┌─ SCOPE ENTERED");
  console.log("│  TDZ STARTS for variable 'x'");
  console.log("│  ❌ Cannot access x here");
  
  try {
    console.log("│  Attempting to access x...");
    console.log(x);
  } catch (error) {
    console.log("│  ✗ Error:", error.message);
  }
  
  console.log("│");
  let x = 100;
  console.log("│  TDZ ENDS - let x = 100;");
  console.log("│  ✅ Now x is accessible");
  console.log("│  x =", x);
  console.log("└─ SCOPE ENDED\n");
}

console.log("--- Accessing after scope ---");
try {
  console.log(x);  // ❌ x doesn't exist outside block scope
} catch (error) {
  console.log("Error (expected):", error.message);  // ReferenceError
}

console.log("\n================================");
console.log("ALL EXAMPLES COMPLETED!");
console.log("================================\n");

console.log("Key Takeaways:");
console.log("1. Operators: +, -, *, /, ===, &&, ||, !, ++, -- etc.");
console.log("2. Operands: Values/variables that operators work on");
console.log("3. var: Function-scoped, hoisted & initialized as undefined");
console.log("4. let: Block-scoped, hoisted but in TDZ until declaration");
console.log("5. const: Block-scoped, hoisted but in TDZ, prevents reassignment");
console.log("6. TDZ: Period from scope entry until declaration line");
console.log("7. Usage: Use const > let >> var (never var in modern code)");
