const { add } = require('../src/stringCalculator');

describe('String Calculator', () => {

  test('empty string returns 0', () => {
    expect(add("")).toBe(0);
  });

  test('single number returns that number', () => {
    expect(add("1")).toBe(1);
    expect(add("5")).toBe(5);
  });

});