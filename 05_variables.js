// 1. Declaring variables using 'let'
// 'let' is used for values that can change (mutable)
let greeting = "Hello, world!";
let count = 10;
let is_active = true;

// 2. Declaring constants using 'const'
// 'const' is used for values that should not be changed (immutable bindings)
const PI = 3.14159;
const user_id = 101;

// 3. Modifying a 'let' variable
count = count + 5; // The value of count is updated to 15
greeting = "Welcome to JavaScript variables!"; // The value of greeting is changed

// 4. Performing operations with variables
let num1 = 5;
let num2 = 6;
let total = num1 + num2; // 'total' is now 11

// 5. Printing variable values to the console
console.log(greeting);
console.log("Current count:", count);
console.log("Is active:", is_active);
console.log("The value of PI is:", PI);
console.log("The total is:", total);

// Example of an error when trying to reassign a const variable (this line will cause an error)
// PI = 3.14; // Uncaught TypeError: Assignment to constant variable
