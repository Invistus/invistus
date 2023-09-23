import { CalculateInterestParams, CalculationResult, PeriodAmount } from "./ICompoundInterest";

  
export const calculateCompoundInterest = ({
    principal,
    contribution,
    rate,
    period
  }: CalculateInterestParams): CalculationResult => {

    if (period.value === 0) throw new Error("Period must be greater than zero");
    
    const rateValue = rate.period === 'year' ? Math.pow((1 + rate.value), 1/12) - 1 : rate.value;
    const periodValue = period.period === 'year' ? period.value * 12 : period.value;
    const contributionValue = contribution.period === 'year' ? contribution.value / 12 : contribution.value;

    let accumulatedAmount = principal;
    let periodAmount: PeriodAmount[] = [];
    periodAmount.push({
      amount: principal,
      interest: 0.0
    });
  
    for (let i = 0; i < periodValue; i++) {
      const interest = accumulatedAmount * rateValue
      accumulatedAmount += interest + contributionValue;
      periodAmount.push({
        amount: accumulatedAmount - interest - periodAmount[i].interest,
        interest: periodAmount[i].interest + interest
      });
    }
  
    const totalAmount = accumulatedAmount;
    const interestAmount = totalAmount - (principal + (contributionValue * periodValue));
  
    return {
      totalAmount,
      interestAmount,
      periodAmount,
    };
  };
  