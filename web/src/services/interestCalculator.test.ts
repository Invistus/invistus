import { calculateCompoundInterest, CalculationResult, CalculateInterestParams } from 'services/interestCalculator';

describe('calculateCompoundInterest', () => {

  it('should calculate compound interest with monthly contributions and yearly rate period', () => {
    const params: CalculateInterestParams = {
      principal: 1000,
      contribution: 100,
      contributionPeriod: 'month',
      rate: .05,
      ratePeriod: 'year',
      calculationPeriod: 12,
      periodRange: 'year',
    };
    
    const result: CalculationResult = calculateCompoundInterest(params);
    
    expect(result.totalAmount).toBeCloseTo(21330.27, 2);
    expect(result.interestAmount).toBeCloseTo(5930.27, 2);
  });

  it('should calculate compound interest with yearly contributions and monthly rate period', () => {
    const params: CalculateInterestParams = {
      principal: 1000,
      contribution: 1200,
      contributionPeriod: 'year',
      rate: .05,
      ratePeriod: 'month',
      calculationPeriod: 1,
      periodRange: 'year',
    };
    
    const result: CalculationResult = calculateCompoundInterest(params);
    
    expect(result.totalAmount).toBeCloseTo(3387.57, 2);
    expect(result.interestAmount).toBeCloseTo(1187.57, 2);
  });

  it('should calculate compound interest with monthly contributions and rate period with month period range', () => {
    const params: CalculateInterestParams = {
      principal: 1000,
      contribution: 100,
      contributionPeriod: 'month',
      rate: .05,
      ratePeriod: 'month',
      calculationPeriod: 12,
      periodRange: 'month',
    };

    const result: CalculationResult = calculateCompoundInterest(params);

    expect(result.totalAmount).toBeCloseTo(3387.57, 2);
    expect(result.interestAmount).toBeCloseTo(1187.57, 2);
  });

  it('should calculate compound interest with yearly contributions and rate period with month period range', () => {
    const params: CalculateInterestParams = {
      principal: 1000,
      contribution: 1200,
      contributionPeriod: 'year',
      rate: .05,
      ratePeriod: 'month',
      calculationPeriod: 1,
      periodRange: 'month',
    };

    const result: CalculationResult = calculateCompoundInterest(params);

    expect(result.totalAmount).toBeCloseTo(1150.0, 2);
    expect(result.interestAmount).toBeCloseTo(50.0, 2);
  });

  it('should return zero interest amount and same principal when rate is zero', () => {
    const params: CalculateInterestParams = {
      principal: 1000,
      contribution: 100,
      contributionPeriod: 'month',
      rate: 0,
      ratePeriod: 'year',
      calculationPeriod: 1,
      periodRange: 'year',
    };

    const result: CalculationResult = calculateCompoundInterest(params);

    expect(result.totalAmount).toBe(2200);
    expect(result.interestAmount).toBe(0);
  });

  it('should throw an error when calculation period is zero', () => {
    const params: CalculateInterestParams = {
      principal: 1000,
      contribution: 100,
      contributionPeriod: 'month',
      rate: .05,
      ratePeriod: 'year',
      calculationPeriod: 0,
      periodRange: 'year',
    };

    expect(() => calculateCompoundInterest(params)).toThrow();
  });
  
});

