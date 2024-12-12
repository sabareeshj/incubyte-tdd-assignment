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

});