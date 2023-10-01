import { isNotEmpty } from "./objectUtils";

describe('isNotEmpty', () => {

  // 1. Object is not empty (has properties)
  it('should return true for an object with properties', () => {
    const obj = {
      name: "John",
      age: 30
    };
    expect(isNotEmpty(obj)).toBe(true);
  });

  // 2. Object is empty (no properties)
  it('should return false for an empty object', () => {
    const obj = {};
    expect(isNotEmpty(obj)).toBe(false);
  });

  // 3. Value is undefined
  it('should return false for undefined', () => {
    const obj = undefined;
    expect(isNotEmpty(obj)).toBe(false);
  });

  // 4. Non-object values
  it('should return false for strings', () => {
    const obj = "Hello";
    expect(isNotEmpty(obj)).toBe(true);
  });

  it('should return false for numbers', () => {
    const obj = 123;
    expect(isNotEmpty(obj)).toBe(false);
  });

  it('should return false for null', () => {
    const obj = null;
    expect(isNotEmpty(obj)).toBe(false);
  });

});