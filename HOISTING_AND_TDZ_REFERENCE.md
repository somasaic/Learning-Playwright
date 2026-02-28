# JavaScript Hoisting & Temporal Dead Zone (TDZ) - Complete Reference Guide

## Table of Contents

1. [Hoisting Overview](#hoisting-overview)
2. [Var Hoisting](#var-hoisting)
3. [Let & Const Hoisting & TDZ](#let--const-hoisting--tdz)
4. [Scope Differences](#scope-differences)
5. [Comparison Table](#comparison-table)
6. [Practical Examples](#practical-examples)
7. [Best Practices](#best-practices)

---

## Hoisting Overview

**Hoisting** is JavaScript's behavior of moving declarations to the top of their scope before code execution.

### Key Points:

- ✅ **Declaration** is hoisted (moved to scope top)
- ❌ **Initialization/Assignment** stays in place
- Works differently for `var`, `let`, and `const`
- Only declarations are hoisted, not function calls

---

## Var Hoisting

### What Happens:

```javascript
console.log(a); // undefined (NOT an error!)
var a = 10;
console.log(a); // 10
```

### Behind the Scenes (JavaScript transforms it to):

```javascript
var a; // Declaration hoisted, initialized as 'undefined'
console.log(a); // undefined
a = 10; // Assignment stays in place
console.log(a); // 10
```

### Characteristics:

- ✅ Hoisted to the **top of function scope** (or global scope)
- ✅ Initialized as `undefined` during hoisting
- ✅ Allows **re-declaration**
- ✅ Allows **re-assignment**
- **Scope**: Function-scoped (not block-scoped)

### Example:

```javascript
function example() {
  console.log(x); // undefined (hoisted here)
  var x = 5;
  console.log(x); // 5

  var x = 10; // ✅ Re-declaration allowed
  console.log(x); // 10
}

// x is NOT accessible outside function (function-scoped)
console.log(x); // ReferenceError: x is not defined
```

---

## Let & Const Hoisting & TDZ

### What is Temporal Dead Zone (TDZ)?

**TDZ**: The time period from when a scope is entered until a variable is declared.

- Variable is **hoisted but NOT initialized**
- Attempting to access it throws `ReferenceError`
- Forces you to declare variables before using them

### Visual Timeline:

```
┌─────────────────────────────────────────────────┐
│ SCOPE ENTERED                                   │
├─────────────────────────────────────────────────┤
│ TDZ STARTS HERE (for variable 'x')              │
│ ❌ Accessing x throws ReferenceError            │
├─────────────────────────────────────────────────┤
│ let/const x = value;  ← DECLARATION LINE        │
│ TDZ ENDS HERE        ↓                          │
├─────────────────────────────────────────────────┤
│ ✅ Accessing x is safe now                     │
└─────────────────────────────────────────────────┘
```

### How It Works:

#### With `let`:

```javascript
console.log(b); // ❌ ReferenceError: Cannot access 'b' before initialization
let b = 20;
console.log(b); // ✅ 20
```

Behind the scenes:

```javascript
// JavaScript hoists the declaration but doesn't initialize
// let b; ← hoisted but frozen
console.log(b); // ❌ ReferenceError (in TDZ)
let b = 20; // TDZ ends here, b now accessible
console.log(b); // ✅ 20
```

#### With `const`:

```javascript
console.log(c); // ❌ ReferenceError: Cannot access 'c' before initialization
const c = 30;
console.log(c); // ✅ 30
```

### Key Characteristics:

- ✅ Hoisted but **NOT initialized**
- ✅ In **Temporal Dead Zone** until declaration line
- ❌ No **re-declaration** (SyntaxError)
- ❌ No **re-assignment** (const only - TypeError)
- **Scope**: Block-scoped

---

## Scope Differences

### Function Scope vs Block Scope

#### Var (Function-Scoped):

```javascript
function test() {
  if (true) {
    var x = 10;
  }
  console.log(x); // ✅ 10 (accessible outside if block)
}

console.log(x); // ❌ ReferenceError (not in global scope)
```

#### Let & Const (Block-Scoped):

```javascript
function test() {
  if (true) {
    let y = 20;
    const z = 30;
  }
  console.log(y); // ❌ ReferenceError (block-scoped)
  console.log(z); // ❌ ReferenceError (block-scoped)
}

// Outside function
console.log(y); // ❌ ReferenceError
console.log(z); // ❌ ReferenceError
```

### Block Scope Areas:

- `if {}` blocks
- `for {}` loops
- `while {}` loops
- `{ }` standalone blocks
- Function bodies `{ }`

---

## Comparison Table

| Feature                             | `var`                | `let`                  | `const`                |
| ----------------------------------- | -------------------- | ---------------------- | ---------------------- |
| **Hoisted?**                        | ✅ Yes               | ✅ Yes                 | ✅ Yes                 |
| **Initialized before declaration?** | ✅ `undefined`       | ❌ TDZ                 | ❌ TDZ                 |
| **Accessible before declaration?**  | ✅ Yes (`undefined`) | ❌ No (ReferenceError) | ❌ No (ReferenceError) |
| **Re-declaration allowed?**         | ✅ Yes               | ❌ SyntaxError         | ❌ SyntaxError         |
| **Re-assignment allowed?**          | ✅ Yes               | ✅ Yes                 | ❌ TypeError           |
| **Scope Type**                      | Function             | Block                  | Block                  |
| **TDZ?**                            | ❌ No                | ✅ Yes                 | ✅ Yes                 |
| **Use Case**                        | Avoid (legacy)       | Most cases             | Constants              |

---

## Practical Examples

### Example 1: Var Hoisting in Action

```javascript
console.log(name); // undefined
var name = "John";
console.log(name); // John
var name = "Doe";
console.log(name); // Doe (re-declaration works)
```

### Example 2: Let in Block Scope

```javascript
{
  console.log(age); // ❌ ReferenceError (in TDZ)
  let age = 25;
  console.log(age); // ✅ 25
}
console.log(age); // ❌ ReferenceError (out of block scope)
```

### Example 3: Const Cannot be Re-assigned

```javascript
try {
  const PI = 3.14;
  console.log(PI); // 3.14
  PI = 3.15; // ❌ TypeError: Assignment to constant variable
} catch (error) {
  console.log("Error:", error.message);
}
```

### Example 4: TDZ with Loop

```javascript
for (let i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2 (block-scoped to each iteration)
}
console.log(i); // ❌ ReferenceError: i is not defined
```

Compare with `var`:

```javascript
for (var j = 0; j < 3; j++) {
  console.log(j); // 0, 1, 2
}
console.log(j); // 3 (accessible because var is function-scoped)
```

### Example 5: Detecting TDZ

```javascript
console.log("\n--- TDZ START AND END ---");
{
  console.log("TDZ STARTS HERE for variable 'd'");

  try {
    console.log(d); // ❌ ReferenceError (in TDZ)
  } catch (error) {
    console.log("Error caught (we are IN TDZ):", error.message);
  }

  console.log("Still in TDZ, d not yet declared");

  let d = 300; // TDZ ENDS HERE
  console.log("Now outside TDZ, d is accessible:", d); // ✅ 300
}
```

### Example 6: Block Scope with Let

```javascript
if (true) {
  let x = 10; // Block-scoped to this if block
  console.log(x); // ✅ 10
}
console.log(x); // ❌ ReferenceError: x is not defined
```

---

## Best Practices

### ✅ DO:

1. **Use `let` and `const` instead of `var`**

   ```javascript
   let name = "John"; // preferred
   const PI = 3.14; // for constants
   ```

2. **Declare variables at the top of their scope**

   ```javascript
   {
     let x = 10; // Declare at block start
     console.log(x);
   }
   ```

3. **Use `const` by default for values that won't change**

   ```javascript
   const API_URL = "https://api.example.com";
   const MAX_RETRIES = 3;
   ```

4. **Use `let` when you need to reassign**
   ```javascript
   let count = 0;
   count++; // Allowed
   ```

### ❌ DON'T:

1. **Don't rely on hoisting behavior**

   ```javascript
   // Confusing - relies on hoisting
   console.log(x);
   var x = 10;

   // ✅ Better - declare first
   var x = 10;
   console.log(x);
   ```

2. **Don't use `var` in modern code**

   ```javascript
   // ❌ Avoid
   var name = "John";

   // ✅ Use instead
   let name = "John";
   ```

3. **Don't rely on var being function-scoped to access outside blocks**

   ```javascript
   // Confusing behavior
   for (var i = 0; i < 5; i++) {}
   console.log(i); // 5 (accessible - confusing!)
   ```

4. **Don't try to reassign `const` variables**

   ```javascript
   // ❌ Error
   const x = 10;
   x = 20;

   // ✅ Use let instead
   let x = 10;
   x = 20;
   ```

---

## Quick Reference Checklist

- [ ] Understand that hoisting moves declarations to scope top
- [ ] Know that `var` uses function scope, `let`/`const` use block scope
- [ ] Remember `var` initializes as `undefined`, `let`/`const` don't
- [ ] Know that accessing `let`/`const` before declaration = ReferenceError (TDZ)
- [ ] Remember TDZ = from scope entry to declaration line
- [ ] Know `const` prevents re-assignment, all allow re-declaration except `let`/`const`
- [ ] Use `let`/`const` in modern JavaScript, avoid `var`
- [ ] Declare variables early in scope to avoid confusion

---

## Common Mistakes

### Mistake 1: Assuming `let`/`const` aren't hoisted

```javascript
// They ARE hoisted, but in TDZ!
console.log(x); // ❌ ReferenceError, NOT undefined
let x = 10;
```

### Mistake 2: Mixing var scope with block scope

```javascript
for (var i = 0; i < 3; i++) {}
console.log(i); // 3 (var is function-scoped!)

for (let j = 0; j < 3; j++) {}
console.log(j); // ❌ ReferenceError (let is block-scoped)
```

### Mistake 3: Trying to re-assign const

```javascript
const config = { port: 3000 };
config.port = 8000; // ✅ Works (modifying object)
config = {}; // ❌ TypeError (re-assigning const)
```

---

## Summary

| Concept      | Explanation                                                                 |
| ------------ | --------------------------------------------------------------------------- |
| **Hoisting** | Declarations move to scope top before execution                             |
| **TDZ**      | Period from scope entry until declaration - accessing throws ReferenceError |
| **Var**      | Function-scoped, initialized as undefined, allows re-declaration            |
| **Let**      | Block-scoped, in TDZ until declaration, no re-declaration                   |
| **Const**    | Block-scoped, in TDZ until declaration, no re-declaration, no re-assignment |
