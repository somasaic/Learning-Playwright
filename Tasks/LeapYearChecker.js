function leapYearChecker(year) {

    // Step 1: Validate input
    if (typeof year !== 'number' || isNaN(year)) {
        throw new Error('Input must be a valid number');
    }

    // Step 2: Must be a positive integer
    if (!Number.isInteger(year)) {
        throw new Error('Year must be an integer');
    }

    if (year <= 0) {
        throw new Error('Year must be greater than zero');
    }

    // Step 3: Leap year rule
    // Divisible by 400 → Leap Year
    if (year % 400 === 0) {
        return "Leap Year";
    }

    // Divisible by 100 → NOT Leap Year
    if (year % 100 === 0) {
        return "Not a Leap Year";
    }

    // Divisible by 4 → Leap Year
    if (year % 4 === 0) {
        return "Leap Year";
    }

    // Otherwise → Not Leap Year
    return "Not a Leap Year";
}


if (require.main === module) {

    // node leapyear.js 2026
    var year = parseInt(process.argv[2]);

    try {
        var result = leapYearChecker(year);
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = { leapYearChecker };