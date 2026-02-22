/* Oprators are used to perform operations on variables and values.
    -> We know many operators from school. They are things like addition +, multiplication *, subtraction -, and so on.

    Terms: “unary”, “binary”, “operand”
     -> An operand – is what operators are applied to. 
     For instance, in the multiplication of 5 * 2 there are two operands: 
     the left operand is 5 and the right operand is 2. 
     Sometimes, people call these “arguments” instead of “operands”.
     
     -> An operator is unary if it has a single operand. 
     For example, the unary negation - reverses the sign of a number:

     -> An operator is binary if it has two operands. The same minus exists in binary form as well:

     */
// unary
let x = 1, y = 3;
x = -x;
console.log( x ); // -1, unary negation was applied

// binary
console.log( y - x ); // 2, binary minus subtracts values

/* 
    Formally, in the examples above we have two different operators that share the same symbol: 
    -> the negation operator, a unary operator that reverses the sign, and 
       the subtraction operator, a binary operator that subtracts one number from another.

---------------------------------------------------------------------------------------------------------------
*/



let a = 10, b = 5;
console.log(`operands:- a =${a}, b = ${b}`); // operand values


// Arithmetic Opertors
console.log(`Addition -> a + b =", ${a + b}`); // 15
console.log(`Substraction -> a - b =", ${a - b}`); // 5
console.log(`Multiplication -> a * b =", ${a * b}`); // 50
console.log(`Division -> a + b =", ${a / b}`); // 2 
// -> gets the output of 2.0 but JS converts it to 2 
// -> divison operator takes Quoficient

console.log(`Modulo -> a % b =", ${a % b}`); // 0 
// -> it gets remainder of the division operation 

console.log(`Exponentiation -> a ** b =", ${a ** b}`); // 100000 
/* -> 1.  it gets value to the power of b (a^b), so 10^5 -> expression(10*10*10*10*10) = 100000
   
   -> 2. Just like in maths, the exponentiation operator is defined for non-integer numbers as well.
      For example, a square root is an exponentiation by ½:
*/
console.log( `Square root of a -> a ** (2/3) =", ${a ** (2/3)}`); // 3.1622776601683795

// ------------------------------------------------------------------------------------------

// String concatenation with binary + 
let s = "QA" + "Engineer";
console.log(s) // QA Engineer

let str1 = "Hello, ", str2 = "QA Engineer!";
console.log( str1 + str2 ); // "Hello, QA Engineer!"

// Note that if any of the operands is a string, then the other one is converted to a string too.
// -> For example:
console.log( 1 + "2" ); // "12"
console.log( "2a" + 1 ); // "2a1"

console.log(typeof("2a" + 1)); // string

//more complex example
console.log( typeof(2 + 2 + "1") ); // 41 - string
/* "41" (the result of 2 + 2 is 4, then "4" + "1" is "41")
    Here, operators work one after another. 
    The first + sums two numbers, so it returns 4, 
    then the next + adds the string 1 to it, 
    so it’s like 4 + '1' = '41'.
*/

console.log( typeof("1" + 2 + 2) ); // 122 - string
/*  Here, the first operand is a string, 
    the compiler treats the other two operands as strings too. 
    The 2 gets concatenated to '1', so it’s like '1' + 2 = "12" 
    and "12" + 2 = "122".
*/

/* 
    The binary + is the only operator that supports strings in such a way. 
    Other arithmetic operators work only with numbers and always convert their operands to numbers.
 */
console.log( 6 - '2'); // 4, string '2' is converted to number 2
console.log( '6' / '2'); // 3, both operands converted to numbers
console.log( '6' * '2'); // 12, both operands converted to numbers

//----------------------------------------------------------------------------------------------

// Numeric conversion, unary +
/* 
   The plus '+' exists in two forms: the binary form that we used above and the unary form.
   -> The unary plus or, in other words, the plus operator '+' applied to a single value, 
   doesn’t do anything to numbers. But if the operand is not a number, 
   the unary plus converts it into a number.
*/

// No effect on numbers
let i = 1;
console.log( +i ); // 1

let j = -2;
console.log( +j ); // -2

// Converts non-numbers
console.log( +true ); // 1
console.log( +"" );   // 0

/* 
    It actually does the same thing as Number(...), but is shorter.
    
    The need to convert strings to numbers arises very often. 
    For example, if we are getting values from HTML form fields, 
    they are usually strings. What if we want to sum them?
    The binary plus would add them as strings:
*/
let apples = "2";
let oranges = "3";
console.log( apples + oranges ); // "23", the binary plus concatenates strings

// If we want to treat them as numbers, we need to convert and then sum them:
// both values converted to numbers before the binary plus
console.log( +apples + +oranges ); // 5
// the longer variant
// console.log( Number(apples) + Number(oranges) ); // 5

//--------------------------------------------------------------------------------------------------------















































