import { CalculateInterestParams, CalculationResult } from './ICompoundInterest';
import { calculateCompoundInterest } from './interestCalculator';


describe('calculateCompoundInterest', () => {

  it('should calculate compound interest with monthly contributions and yearly rate period', () => {
    const params: CalculateInterestParams = {
      principal: 1000,
      contribution: {
        value: 100,
        period: 'month'
      },
      rate: {
        value: .05,
        period: 'year'
      }, 
      period: {
        value: 12,
        period: 'year'
      }    
    };
    
    const result: CalculationResult = calculateCompoundInterest(params);
    
    expect(result.totalAmount).toBeCloseTo(21330.27, 2);
    expect(result.interestAmount).toBeCloseTo(5930.27, 2);
  });

  it('should calculate compound interest with yearly contributions and monthly rate period', () => {
    const params: CalculateInterestParams = {
      principal: 1000,
      contribution: {
        value: 1200,
        period: 'year'
      },
      rate: {
        value: .05,
        period: 'month'
      }, 
      period: {
        value: 1,
        period: 'year'
      }    
    };
    
    const result: CalculationResult = calculateCompoundInterest(params);
    
    expect(result.totalAmount).toBeCloseTo(3387.57, 2);
    expect(result.interestAmount).toBeCloseTo(1187.57, 2);
  });

  it('should calculate compound interest with monthly contributions and rate period with month period range', () => {
    const params: CalculateInterestParams = {
      principal: 1000,
      contribution: {
        value: 100,
        period: 'month'
      },
      rate: {
        value: .05,
        period: 'month'
      }, 
      period: {
        value: 12,
        period: 'month'
      }
    };

    const result: CalculationResult = calculateCompoundInterest(params);

    expect(result.totalAmount).toBeCloseTo(3387.57, 2);
    expect(result.interestAmount).toBeCloseTo(1187.57, 2);
  });

  it('should calculate compound interest with yearly contributions and rate period with month period range', () => {
    const params: CalculateInterestParams = {
      principal: 1000,
      contribution: {
        value: 1200,
        period: 'year'
      },
      rate: {
        value: .05,
        period: 'month'
      }, 
      period: {
        value: 1,
        period: 'month'
      }
    };

    const result: CalculationResult = calculateCompoundInterest(params);

    expect(result.totalAmount).toBeCloseTo(1150.0, 2);
    expect(result.interestAmount).toBeCloseTo(50.0, 2);
  });

  it('should return zero interest amount and same principal when rate is zero', () => {
    const params: CalculateInterestParams = {
      principal: 1000,
      contribution: {
        value: 100,
        period: 'month'
      },
      rate: {
        value: 0,
        period: 'year'
      }, 
      period: {
        value: 1,
        period: 'year'
      }      
    };

    const result: CalculationResult = calculateCompoundInterest(params);

    expect(result.totalAmount).toBe(2200);
    expect(result.interestAmount).toBe(0);
  });

  it('should throw an error when calculation period is zero', () => {
    const params: CalculateInterestParams = {
      principal: 1000,
      contribution: {
        value: 100,
        period: 'month'
      },
      rate: {
        value: .05,
        period: 'year'
      }, 
      period: {
        value: 0,
        period: 'year'
      }    
    };

    expect(() => calculateCompoundInterest(params)).toThrow();
  });
  
});

