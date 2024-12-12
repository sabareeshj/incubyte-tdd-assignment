const { add } = require('../src/stringCalculator');

describe('String Calculator', () => {

  test('empty string returns 0', () => {
    expect(add("")).toBe(0);
  });

  test('single number returns that number', () => {
    expect(add("1")).toBe(1);
    expect(add("5")).toBe(5);
  });

  test('two comma-separated numbers return their sum', () => {
    expect(add("1,2")).toBe(3);
    expect(add("2,3")).toBe(5);
  });

  test('unknown amount of numbers', () => {
    expect(add("1,2,3")).toBe(6);
    expect(add("2,3,4,5")).toBe(14);
  });

  test('new line as a delimiter along with commas', () => {
    expect(add("1\n2,3")).toBe(6);
  });

  test('support custom delimiter', () => {
    expect(add("//;\n1;2")).toBe(3);
    expect(add("//|\n2|3|4")).toBe(9);
  });

  test('negative numbers throw exception', () => {
    expect(() => add("1,-2,3")).toThrow("negatives not allowed: -2");
    expect(() => add("2,-4,-5")).toThrow("negatives not allowed: -4,-5");
  });

  test('numbers greater than 1000 are ignored', () => {
    expect(add("2,1001")).toBe(2);
    expect(add("1001,2")).toBe(2);
    expect(add("999,1000,1001,2")).toBe(999+1000+2);
  });

  test('delimiters can be of any length', () => {
    expect(add("//[***]\n1***2***3")).toBe(6);
  });

  test('multiple delimiters with longer length', () => {
    expect(add("//[***][%%]\n1***2%%3")).toBe(6);
  });

});