export type InvestmentType = 'CDB' | 'LCA/LCI';
export type InvestmentCategory = 'pre-fixed' | 'inflation-linked' | 'post-fixed';

export interface IFixedIncomeBenchmarck {
  investmentType: InvestmentType,
  investmentCategory: InvestmentCategory,
  investmentCategoryIndexPostFixed: number,
  investmentCategoryIndexIPCA: number,
  grossReturnPercentage: number,
  durationDays: number,
  dueDate?: Date
};

export interface IFixedIncomeBenchmarckOutput {
  equivalentInvestment: InvestmentType,
  netReturn: number;
  regressiveRates?: any; // Please define this type according to the actual data structure
};