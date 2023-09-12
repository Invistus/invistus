export interface CalculateInterestParams {
    principal: number;
    contribution: number;
    rate: number;
    calculationPeriod: number;
    contributionPeriod: 'year' | 'month';
    ratePeriod: 'year' | 'month';
    periodRange: 'year' | 'month';
  }

  export interface PeriodAmount {
    amount: number,
    interest: number
  }
  export interface CalculationResult {
    totalAmount: number;
    interestAmount: number;
    periodAmount: PeriodAmount[];
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

    if (calculationPeriod === 0) throw new Error("Period must be greater than zero");
    
    rate = ratePeriod === 'year' ? Math.pow((1 + rate), 1/12) - 1 : rate;
    calculationPeriod = periodRange === 'year' ? calculationPeriod * 12 : calculationPeriod;
    contribution = contributionPeriod === 'year' ? contribution / 12 : contribution;

    let accumulatedAmount = principal;
    let periodAmount: PeriodAmount[] = [];
    periodAmount.push({
      amount: principal,
      interest: 0.0
    });
  
    for (let i = 0; i < calculationPeriod; i++) {
      const interest = accumulatedAmount * rate
      accumulatedAmount += interest + contribution;
      periodAmount.push({
        amount: accumulatedAmount - interest - periodAmount[i].interest,
        interest: periodAmount[i].interest + interest
      });
    }
  
    const totalAmount = accumulatedAmount;
    const interestAmount = totalAmount - (principal + (contribution * calculationPeriod));
  
    return {
      totalAmount,
      interestAmount,
      periodAmount,
    };
  };
  