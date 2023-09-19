
export type InvestmentType = 'CDB' | 'LCA/LCI';
export type InvestmentCategory = 'pre-fixed' | 'inflation-linked' | 'post-fixed';

export interface IFixedIncomeComparison {
  investmentType: InvestmentType,
  investmentCategory: InvestmentCategory,
  grossReturnPercentage: number,
  durationDays: number,
  dueDate?: Date
};

export interface IFixedIncomeComparisonOutput {
  equivalentInvestment: InvestmentType,
  netReturn: number;
  regressiveRates?: any; // Please define this type according to the actual data structure
};

async function calculateNetReturn(input: IFixedIncomeComparison): Promise<IFixedIncomeComparisonOutput> {
  try {
    if (!input.investmentType || 
         input.grossReturnPercentage <= 0 || 
         input.durationDays <= 0) {
      throw new Error('Invalid input');
    }

    // Placeholder calculation logic, replace with your actual calculation formulas
    const netReturn = input.grossReturnPercentage * (input.durationDays / 365);
    const equivalentInvestmentNetReturn = netReturn; // Placeholder, replace with actual logic

    let equivalentInvestment: InvestmentType;
    let regressiveRates: any; // Placeholder, define the actual data structure and logic

    if (input.investmentType === 'CDB') {
      equivalentInvestment = 'LCA/LCI';
      // Calculate regressive rates here based on input data
      regressiveRates = { /* your regressive rates calculation here */ };
    } else {
      equivalentInvestment = 'CDB';
    }

    let taxRate: number;
    if (input.durationDays <= 180) {
      taxRate = 22.5;
    } else if (input.durationDays <= 360) {
      taxRate = 20;
    } else if (input.durationDays <= 720) {
      taxRate = 17.5;
    } else {
      taxRate = 15;
    }
  
    // const netReturn = input.grossReturnPercentage * (1 - taxRate / 100);
  
    const netReturnsCDB = {
      "up to 180 days": input.grossReturnPercentage * (1 - 22.5 / 100),
      "181 to 360 days": input.grossReturnPercentage * (1 - 20 / 100),
      "361 to 720 days": input.grossReturnPercentage * (1 - 17.5 / 100),
      "above 720 days": input.grossReturnPercentage * (1 - 15 / 100),
    };

    const output: IFixedIncomeComparisonOutput = {
      equivalentInvestment,
      netReturn,
      regressiveRates,
    };

    return output;
  } catch (error) {
    // Handle error appropriately here
    throw new Error('Error calculating net return');
  }
}

export default calculateNetReturn;
  