export interface CalculateInterestParams {
    principal: number;
    contribution: number;
    rate: number;
    calculationPeriod: number;
    contributionPeriod: 'year' | 'month';
    ratePeriod: 'year' | 'month';
    periodRange: 'year' | 'month';
  }

  export interface CalculationResult {
    totalAmount: number;
    interestAmount: number;
    periodAmount: number[];
  }
  
  export const calculateCompoundInterest = ({
    principal,
    contribution,
    rate,
    calculationPeriod,
    contributionPeriod,
    ratePeriod,
    periodRange,
  }: CalculateInterestParams): CalculationResult => {
    rate /= 100;
    rate = ratePeriod === 'year' ? Math.pow((1 + rate), 1/12) - 1 : rate;
    calculationPeriod = periodRange === 'year' ? calculationPeriod * 12 : calculationPeriod;
    contribution = contributionPeriod === 'year' ? contribution / 12 : contribution;
  
    let periodAmount: number[] = [];
    let accumulatedAmount = principal;
  
    for (let i = 0; i < calculationPeriod; i++) {
      accumulatedAmount = (accumulatedAmount * (1 + rate)) + contribution;
      periodAmount.push(accumulatedAmount);
    }
  
    const totalAmount = accumulatedAmount;
    const interestAmount = totalAmount - (principal + (contribution * calculationPeriod));
  
    return {
      totalAmount,
      interestAmount,
      periodAmount,
    };
  };
  