function fizzBuzz(n) {
    // AUTOMATION: Defensive validation
    if (typeof n !== 'number' || isNaN(n)) {
        throw new Error('Input must be a number');
    }
    if (!Number.isInteger(n)) {
        throw new Error('Input must be an integer');
    }
    if (n < 1) {
        throw new Error('Input must be at least 1');
    }
    if (n > 10000) {
        throw new Error('Input must be 10000 or less');
    }

    // AUTOMATION: Return array (not log)
    const result = [];
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) {
            result.push("FizzBuzz");
        } else if (i % 3 === 0) {
            result.push("Fizz");
        } else if (i % 5 === 0) {
            result.push("Buzz");
        } else {
            result.push(i);
        }
    }
    return result;
}

// BEST: Entry point for CLI usage
if (require.main === module) {
    // For CLI, use arguments instead of prompt()
    const n = parseInt(process.argv[2]);
    try {
        const result = fizzBuzz(n);
        console.log(result.join('\n'));
    } catch (error) {
        console.error(error.message);
    }
}

// ESSENTIAL: Export for testing
module.exports = { fizzBuzz };