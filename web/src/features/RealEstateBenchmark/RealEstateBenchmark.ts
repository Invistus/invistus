import { formatCurrency } from 'utils/stringUtils';

export type RealEstateStrategyInput = {
  homePrice: number;
  homeAppreciationRate: number;
  rentAmount: number;
  rentRate: number;
  currentSavings: number;
  monthlyContribution: number;
  mortgageRate: number;
  investmentReturnRate: number;
  periodInMonths: number;
  downPaymentPercentage: number;
  additionalMortageFees: number;
};

export type StrategyOutput = {
  bestStrategy: 'BUY' | 'MORTAGE' | 'RENT';
  strategies: Strategy;
};

export type Strategy = {
  buyStrategy: StrategyPeriod[];
  mortgageStrategy: StrategyPeriod[];
  rentStrategy: StrategyPeriod[];
};

export type StrategyPeriod = {
  period: number;
  totalWealth: number;
  homeAmount?: number;
  investmentAmount?: number;
  mortgageAmount?: number;
  rentAmount?: number;
};

export function realEstateStrategy(input: RealEstateStrategyInput): StrategyOutput {
  const buy = buyStrategy(input);
  const mortage = mortgageStrategy(input);
  const rent = rentStrategy(input);

  const finalWealths = [
      { strategy: 'BUY', wealth: buy[buy.length - 1].totalWealth },
      { strategy: 'MORTAGE', wealth: mortage[mortage.length - 1].totalWealth },
      { strategy: 'RENT', wealth: rent[rent.length - 1].totalWealth },
  ];

  finalWealths.sort((a, b) => b.wealth - a.wealth);

  return {
      bestStrategy: finalWealths[0].strategy as 'BUY' | 'MORTAGE' | 'RENT',
      strategies: {
          buyStrategy: buy,
          mortgageStrategy: mortage,
          rentStrategy: rent,
      },
  };
}

function buyStrategy(input: RealEstateStrategyInput): StrategyPeriod[] {
  const result: StrategyPeriod[] = [];
  let investmentAmount = input.currentSavings - input.homePrice;
  if (investmentAmount < 0) {
    result.push({
        period: 0,
        totalWealth: investmentAmount
    });
    return result;
  }
  let homeAmount = input.homePrice;
  const monthlyInvestmentRate = Math.pow(1 + input.investmentReturnRate, 1/12) - 1;  // Convert annual to monthly rate
  const monthlyHomeAppreciationRate = Math.pow(1 + input.homeAppreciationRate, 1/12) - 1;  // Convert annual to monthly rate

  for (let i = 1; i <= input.periodInMonths; i++) {
      investmentAmount *= (1 + monthlyInvestmentRate);
      investmentAmount += input.monthlyContribution;
      homeAmount *= (1 + monthlyHomeAppreciationRate);

      result.push({
          period: i,
          totalWealth: homeAmount + investmentAmount,
          homeAmount,
          investmentAmount,
      });
  }

  return result;
}

function mortgageStrategy(input: RealEstateStrategyInput): StrategyPeriod[] {
  const result: StrategyPeriod[] = [];
  const downPayment = input.homePrice * input.downPaymentPercentage;
  let outstandingBalance = input.homePrice - downPayment;
  let investmentAmount = input.currentSavings;
  let homeAmount = input.homePrice;
  const principal = outstandingBalance / input.periodInMonths;  // SAC
  const monthlyMortgageRate = Math.pow(1 + input.mortgageRate, 1/12) - 1;  // Convert annual to monthly rate
  const monthlyInvestmentRate = Math.pow(1 + input.investmentReturnRate, 1/12) - 1;  // Convert annual to monthly rate
  const monthlyHomeAppreciationRate = Math.pow(1 + input.homeAppreciationRate, 1/12) - 1;  // Convert annual to monthly rate
  let totalPaidForMortage: number = 0.0;
  let monthlyContribution = input.monthlyContribution;


    investmentAmount -= downPayment;
    investmentAmount -= input.additionalMortageFees;
    totalPaidForMortage += input.additionalMortageFees;

    if (investmentAmount < 0) {
      result.push({
          period: 0,
          totalWealth: investmentAmount
      });
      return result;
    }
  
  for (let i = 1; i <= input.periodInMonths; i++) {

      // Mortage
      const monthlyInterest = outstandingBalance * monthlyMortgageRate;
      const monthlyPayment = principal + monthlyInterest;
      totalPaidForMortage += monthlyPayment;
      outstandingBalance -= principal;

      // Investments
      monthlyContribution *= (1 + monthlyInvestmentRate);
      let monthBalance = monthlyContribution - monthlyPayment;
      if (monthBalance < 0) {
        throw new Error('monthlyContributionIsLessThanMortageMonthlyPayment', {
          cause: {
            monthlyPayment: formatCurrency(monthlyPayment),
            monthlyContribution: formatCurrency(monthlyContribution),
            period: i
          }
        });
      }
      investmentAmount *= (1 + monthlyInvestmentRate);

      // Home appreciation
      homeAmount *= (1 + monthlyHomeAppreciationRate);

      result.push({
          period: i,
          totalWealth: homeAmount + investmentAmount - totalPaidForMortage,
          homeAmount,
          investmentAmount,
          mortgageAmount: totalPaidForMortage,
      });
  }

  return result;
}

function rentStrategy(input: RealEstateStrategyInput): StrategyPeriod[] {
  const result: StrategyPeriod[] = [];
  let investmentAmount = input.currentSavings;
  let rentAmount = input.rentAmount;
  const monthlyInvestmentRate = Math.pow(1 + input.investmentReturnRate, 1/12) - 1;  // Convert annual to monthly rate
  const monthlyRentRate = Math.pow(1 + input.rentRate, 1/12) - 1;  // Convert annual to monthly rate
  let totalPaidForRenting: number = 0.0;
  let monthlyContribution = input.monthlyContribution;

  for (let i = 1; i <= input.periodInMonths; i++) {

      // Investments
      monthlyContribution *= (1 + monthlyInvestmentRate);
      let monthBalance = monthlyContribution - rentAmount;
      if (monthBalance < 0) {
        throw new Error('monthlyContributionIsLessThanRentAmount', {
          cause: {
            rentAmount: formatCurrency(rentAmount),
            monthlyContribution: formatCurrency(monthlyContribution),
            period: i
          }
        });
      }
      investmentAmount += monthBalance;
      investmentAmount *= (1 + monthlyInvestmentRate);

      // Pay Rent
      totalPaidForRenting += rentAmount;
      rentAmount *= (1 + monthlyRentRate);

      result.push({
          period: i,
          totalWealth: investmentAmount - totalPaidForRenting,
          investmentAmount,
          rentAmount: totalPaidForRenting,
      });
  }

  return result;
}
