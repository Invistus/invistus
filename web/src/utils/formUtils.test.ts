import { renderHook } from '@testing-library/react'
import { getInputDefaults, useNumericInput } from './formUtils';
import { formatNumber, formatCurrency, formatPercentage } from './stringUtils';

describe('numericInputUtils', () => {
  
  describe('getInputDefaults', () => {
    it('should return default formatted values', () => {
      const defaults = getInputDefaults();

      expect(defaults.number).toEqual(formatNumber(0, 0));
      expect(defaults.currency).toEqual(formatCurrency(0, 2));
      expect(defaults.percentage).toEqual(formatPercentage(0, 2));
    });

    it('should return the same instance for multiple calls', () => {
      const firstCall = getInputDefaults();
      const secondCall = getInputDefaults();

      expect(firstCall).toBe(secondCall);
    });
  });

//   describe('useNumericInput', () => {
//     it('should return an input ref', () => {
//       const { result } = renderHook(() => useNumericInput());
      
//       expect(result.current.inputRef).toBeDefined();
//     });
//   });
});
