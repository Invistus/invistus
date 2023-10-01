import { formatCurrency, formatErrorMessage, parseCurrency, parseNumber, parsePercentage } from './stringUtils';

describe('Utility Methods', () => {

  describe('formatCurrency', () => {
    it('should format numbers as currency', () => {
      expect(formatCurrency(1234.56)).toBe('R$ 1.234,56');
    });

    it('should format 0 as currency', () => {
      expect(formatCurrency(0)).toBe('R$ 0,00');
    });

    it('should format NaN as 0 currency', () => {
      expect(formatCurrency(NaN)).toBe('R$ 0,00');
    });
  });

  describe('parseCurrency', () => {
    it('should parse currency strings to numbers', () => {
      expect(parseCurrency('R$ 1.234,56')).toBe(1234.56);
    });

    it('should return null for invalid currency strings', () => {
      expect(parseCurrency('invalid currency string')).toBeNull();
    });
  });

  describe('parseNumber', () => {
    it('should parse number strings to numbers', () => {
      expect(parseNumber('1234')).toBe(1234);
    });

    it('should return null for non-number strings', () => {
      expect(parseNumber('abcd')).toBeNull();
    });
  });

  describe('parsePercentage', () => {
    it('should parse percentage strings to numbers', () => {
      expect(parsePercentage('50%')).toBe(0.5);
    });

    it('should return null for invalid percentage strings', () => {
      expect(parsePercentage('invalid%')).toBeNull();
    });
  });

  describe('formatErrorMessage', () => {

    // 1. Message has placeholders, data provides replacements
    it('should replace placeholders with provided data', () => {
      const message = "Hello [name], you are [age] years old!";
      const data = {
        name: "John",
        age: "30"
      };
      const result = formatErrorMessage(message, data);
      expect(result).toBe("Hello John, you are 30 years old!");
    });
  
    // 2. Message has placeholders, but data doesn't provide replacements for all
    it('should replace only the placeholders with provided data keys', () => {
      const message = "Hello [name], you are [age] years old!";
      const data = {
        name: "John"
      };
      const result = formatErrorMessage(message, data);
      expect(result).toBe("Hello John, you are [age] years old!");
    });
  
    // 3. Message has no placeholders, but data is provided
    it('should return the original message if no placeholders match the data', () => {
      const message = "Hello there!";
      const data = {
        name: "John",
        age: "30"
      };
      const result = formatErrorMessage(message, data);
      expect(result).toBe(message);
    });
  
    // 4. Neither the message nor data contain placeholders or keys
    it('should return the original message if no data is provided', () => {
      const message = "Hello there!";
      const data = {};
      const result = formatErrorMessage(message, data);
      expect(result).toBe(message);
    });
  });
  
});
