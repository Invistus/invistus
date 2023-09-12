import { formatCurrency, parseCurrency, parseNumber, parsePercentage } from 'components/utils/stringUtils';

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
});
