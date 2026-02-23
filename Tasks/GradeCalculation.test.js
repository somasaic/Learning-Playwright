const { gradeCalculation } = require('./GradeCalculation');

describe('Grade Calculation', () => {
    // Valid scores
    test('Score 95 returns A', () => {
        expect(gradeCalculation(95)).toBe('A');
    });
    
    test('Score 85 returns B', () => {
        expect(gradeCalculation(85)).toBe('B');
    });
    
    test('Score 75 returns C', () => {
        expect(gradeCalculation(75)).toBe('C');
    });
    
    test('Score 65 returns D', () => {
        expect(gradeCalculation(65)).toBe('D');
    });
    
    test('Score 55 returns F', () => {
        expect(gradeCalculation(55)).toBe('F');
    });
    
    // Boundary tests (automation mindset!)
    test('Score 90 returns A', () => {
        expect(gradeCalculation(90)).toBe('A');
    });
    
    test('Score 89 returns B', () => {
        expect(gradeCalculation(89)).toBe('B');
    });
    
    // Error cases
    test('Negative score throws error', () => {
        expect(() => gradeCalculation(-5)).toThrow();
    });
    
    test('Score > 100 throws error', () => {
        expect(() => gradeCalculation(101)).toThrow();
    });
    
    test('Non-number throws error', () => {
        expect(() => gradeCalculation('abc')).toThrow();
    });
});