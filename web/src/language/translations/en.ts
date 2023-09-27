import { ILanguagePack } from 'language/translations/ILanguagePack';

export const en: ILanguagePack = {
  common: {
    result: "Result",
    more_about: "Learn more about it...",
    errors: {
      fieldRequired: "This field is required",
      rateGreaterThanZero: "Rate must be greater than zero",
    }  
  },  
  compoundInterest: {
    label: "Compound Interest",
    principal: "Principal",
    contribution: "Contribution",
    rate: "Rate",
    period: "Period",
    submit: "Calculate",
    errors: {
      calculationPeriodGreaterThanZero:  "Period must be greater than zero",
      eitherPrincipalOrContribution: "Either Principal or Contribution must be filled"
    }  
  },
  fixedIncome: {
    label: "Fixed income"
  },
  fixedIncomeBenchmark: {
    label: "CDB vs LCA/LCI",
    resultLabel: "Benchmark after [durationDays] days",
    cdb: "CDB",
    lca_lci: "LCA/LCI",
    pre_fixed: 'Pre Fixed',
    post_fixed: 'Post Fixed',
    inflation_linked: 'Inflation',
    investmentType: "Type",
    investmentCategory: "Category",
    investmentCategoryIndexPostFixed: "Post Fixed Index (yearly)",
    investmentCategoryIndexIPCA: "Inflation Rate (yearly)",
    grossReturnPercentage: "Rate",
    durationDays: "Duration (days)",
    dueDate: "Due Date",
    submit: "Calcular",
    tax_0_180_days: "0 to 180 days",
    tax_181_360_days: "181 to 360 days",
    tax_361_720_days: "361 to 720 days",
    tax_above_720_days: "Above 720 days",
    dividendYield: "Dividend Yield",
    tax_table: "Tax table",
    tax: "Tax rate",
    netReturn: "Net Return",
    errors: {
      investmentCategoryIndexPostFixedGreaterThanZero: "CDI must be greater than zero",
      investmentCategoryIndexIPCAGreaterThanZero: "IPCA must be greater than zero",
      grossReturnPercentageGreaterThanZero: "Rate must be greater than zero",
      durationDaysGreaterThanZero: "Duration must be greater than zero",
    }
  }  
};