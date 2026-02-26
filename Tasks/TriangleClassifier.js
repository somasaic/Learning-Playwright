function triangleclassifier(side1, side2, side3) {

    // Step 1: Validate all inputs
    if (
        typeof side1 !== 'number' || isNaN(side1) ||
        typeof side2 !== 'number' || isNaN(side2) ||
        typeof side3 !== 'number' || isNaN(side3)
    ) {
        throw new Error('All inputs must be numbers');
    }

    // Step 2: Inputs must be positive
    if (side1 <= 0 || side2 <= 0 || side3 <= 0) {
        throw new Error('Sides must be greater than zero');
    }

    // Step 3: Triangle Inequality Check
    if (
        side1 + side2 <= side3 ||
        side1 + side3 <= side2 ||
        side2 + side3 <= side1
    ) {
        throw new Error('Not a valid triangle');
    }

    // Step 4: Classification Logic
    if (side1 === side2 && side2 === side3) {
        return 'Equilateral Triangle';
    }
    else if (side1 === side2 || side2 === side3 || side1 === side3) {
        return 'Isosceles Triangle';
    }
    else {
        return 'Scalene Triangle';
    }
}

if (require.main === module) {
    // Read CLI inputs: node triangle.js 10 10 10
    var side1 = parseInt(process.argv[2]);
    var side2 = parseInt(process.argv[3]);
    var side3 = parseInt(process.argv[4]);

    try {
        var result = triangleclassifier(side1, side2, side3);
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = { triangleclassifier };