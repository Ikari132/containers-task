// @vitest-environment jsdom
import { expect, it, describe } from 'vitest'
import { decreaseAngle, increaseAngle, resetAngle, toDegrees, toRadians } from '../helpers';

describe('increaseAngle()', () => {
    it('should increase the angle by the specified amount', () => {
        const inputAngle = 45;
        const increaseAmount = 30;
        const expectedOutput = 75;
        const actualOutput = increaseAngle(inputAngle, increaseAmount);
        expect(actualOutput).toEqual(expectedOutput);
    });

    it('should reset the angle if it goes over 360 degrees', () => {
        const inputAngle = 350;
        const increaseAmount = 30;
        const expectedOutput = 20;
        const actualOutput = increaseAngle(inputAngle, increaseAmount);
        expect(actualOutput).toEqual(expectedOutput);
    });
});

describe('decreaseAngle()', () => {
    it('should decrease the angle by the specified amount', () => {
        const inputAngle = 90;
        const decreaseAmount = 45;
        const expectedOutput = 45;
        const actualOutput = decreaseAngle(inputAngle, decreaseAmount);
        expect(actualOutput).toEqual(expectedOutput);
    });

    it('should reset the angle if it goes below 0 degrees', () => {
        const inputAngle = 30;
        const decreaseAmount = 45;
        const expectedOutput = 345;
        const actualOutput = decreaseAngle(inputAngle, decreaseAmount);
        expect(actualOutput).toEqual(expectedOutput);
    });
});

describe('resetAngle()', () => {
    it('should return the same angle if it is within the range of 0 to 360 degrees', () => {
        const inputAngle = 180;
        const expectedOutput = 180;
        const actualOutput = resetAngle(inputAngle);
        expect(actualOutput).toEqual(expectedOutput);
    });

    it('should reset the angle if it goes over 360 degrees', () => {
        const inputAngle = 405;
        const expectedOutput = 45;
        const actualOutput = resetAngle(inputAngle);
        expect(actualOutput).toEqual(expectedOutput);
    });

    it('should reset the angle if it goes below 0 degrees', () => {
        const inputAngle = -45;
        const expectedOutput = 315;
        const actualOutput = resetAngle(inputAngle);
        expect(actualOutput).toEqual(expectedOutput);
    });
});

describe('toRadians()', () => {
    it('should convert degrees to radians', () => {
        const inputDegrees = 90;
        const expectedOutput = Math.PI / 2;
        const actualOutput = toRadians(inputDegrees);
        expect(actualOutput).toBeCloseTo(expectedOutput);
    });
});

describe('toDegrees()', () => {
    it('should convert radians to degrees', () => {
        const inputRadians = Math.PI / 2;
        const expectedOutput = 90;
        const actualOutput = toDegrees(inputRadians);
        expect(actualOutput).toBeCloseTo(expectedOutput);
    });
});