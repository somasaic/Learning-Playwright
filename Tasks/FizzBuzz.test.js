const { fizzBuzz } = require('./FizzBuss');

describe('FizzBuzz', () => {
    // ✅ Basic functionality tests
    test('Returns array for valid input', () => {
        const result = fizzBuzz(5);
        expect(Array.isArray(result)).toBe(true);
    });

    test('Returns correct sequence for n=5', () => {
        expect(fizzBuzz(5)).toEqual([1, 2, 'Fizz', 4, 'Buzz']);
    });

    test('Returns correct sequence for n=15', () => {
        expect(fizzBuzz(15)).toEqual([
            1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz',
            'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz'
        ]);
    });

    // ✅ Boundary tests (Automation Mindset!)
    test('Returns [1] for n=1', () => {
        expect(fizzBuzz(1)).toEqual([1]);
    });

    test('Returns correct result for multiples of 3', () => {
        const result = fizzBuzz(9);
        expect(result[2]).toBe('Fizz');  // Position 3 = "Fizz"
        expect(result[5]).toBe('Fizz');  // Position 6 = "Fizz"
        expect(result[8]).toBe('Fizz');  // Position 9 = "Fizz"
    });

    test('Returns correct result for multiples of 5', () => {
        const result = fizzBuzz(10);
        expect(result[4]).toBe('Buzz');  // Position 5 = "Buzz"
        expect(result[9]).toBe('Buzz');  // Position 10 = "Buzz"
    });

    test('Returns "FizzBuzz" for multiples of 15', () => {
        const result = fizzBuzz(15);
        expect(result[14]).toBe('FizzBuzz');  // Position 15 = "FizzBuzz"
    });

    test('Returns correct length', () => {
        expect(fizzBuzz(100).length).toBe(100);
    });

    // ❌ Error cases (Automation Mindset!)
    test('Throws error for negative numbers', () => {
        expect(() => fizzBuzz(-5)).toThrow('Input must be at least 1');
    });

    test('Throws error for zero', () => {
        expect(() => fizzBuzz(0)).toThrow('Input must be at least 1');
    });

    test('Throws error for non-integer', () => {
        expect(() => fizzBuzz(5.5)).toThrow('Input must be an integer');
    });

    test('Throws error for non-number string', () => {
        expect(() => fizzBuzz('abc')).toThrow('Input must be a number');
    });

    test('Throws error for null', () => {
        expect(() => fizzBuzz(null)).toThrow('Input must be a number');
    });

    test('Throws error for undefined', () => {
        expect(() => fizzBuzz(undefined)).toThrow('Input must be a number');
    });

    test('Throws error for NaN', () => {
        expect(() => fizzBuzz(NaN)).toThrow('Input must be a number');
    });

    test('Throws error for too large number', () => {
        expect(() => fizzBuzz(99999)).toThrow('Input must be 10000 or less');
    });
});
