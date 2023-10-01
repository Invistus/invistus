import { realEstateStrategy, RealEstateStrategyInput } from './RealEstateBenchmark';

describe('realEstateStrategy', () => {
  let basicInput: RealEstateStrategyInput;

  beforeEach(() => {
    basicInput = {
      homePrice: 1000000,
      homeAppreciationRate: 0.05,
      mortgageRate: 0.1,
      downPaymentPercentage: 0.2,
      additionalMortageFees: 0,
      rentAmount: 7500,
      rentRate: 0.12,
      currentSavings: 1000000,
      monthlyContribution: 10000,
      investmentReturnRate: 0.12,
      periodInMonths: 240,
    };
  });

  // Positive Scenario: Buy is the best strategy
  it('should select BUY as the best strategy when buying outright is favorable', () => {
    const result = realEstateStrategy(basicInput);
    expect(result.bestStrategy).toBe('BUY');
  });

  // Positive Scenario: Mortgage is the best strategy
  it('should select MORTAGE as the best strategy when taking a mortgage is favorable', () => {
    basicInput.homeAppreciationRate = 0.15;
    basicInput.currentSavings = 0;
    const result = realEstateStrategy(basicInput);
    expect(result.bestStrategy).toBe('MORTAGE');
  });

  // Positive Scenario: Rent is the best strategy
  it('should select RENT as the best strategy when renting is favorable', () => {
    basicInput.homeAppreciationRate = 0.15;
    basicInput.currentSavings = 0;
    basicInput.rentAmount = 500;
    const result = realEstateStrategy(basicInput);
    expect(result.bestStrategy).toBe('RENT');
  });

  // Negative Scenario: monthlyContribution less than monthly mortgage payment
  it('should throw error when monthly contribution is less than monthly mortgage payment', () => {
    basicInput.monthlyContribution = 1000;
    expect(() => realEstateStrategy(basicInput)).toThrow('monthlyContributionIsLessThanMortageMonthlyPayment');
  });

  // Negative Scenario: monthlyContribution less than rent amount
  it('should throw error when monthly contribution is less than rent amount', () => {
    basicInput.currentSavings = 0;
    basicInput.rentAmount = 1500;
    basicInput.monthlyContribution = 1000;
    expect(() => realEstateStrategy(basicInput)).toThrow('monthlyContributionIsLessThanRentAmount');
  });
});
