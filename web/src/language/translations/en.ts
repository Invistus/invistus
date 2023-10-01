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
  },
  realEstateBenchmark: {
    label: "Real state benchmark",
    realEstate: "Real estate",
    assets: "Assets",
    homePrice: "Home price",
    homeAppreciationRate: "Home appreciation annual rate",
    mortage: "Mortage",
    mortgageRate: "Mortage annual rate",
    downPaymentPercentage: "Down payment percentage",
    additionalMortageFees: "Additional Financing Fees",
    rent: "Rent",
    rentAmount: "Rent month amount",
    rentRate: "Rent annual rate",
    investment: "Investment",
    currentSavings: "Current savings",
    monthlyContribution: "Monthly contribution",
    investmentReturnRate: "Investment annual return rate",
    period: "Period",
    periodInMonths: "Periods in months",
    strategy: "Strategy",
    bestStrategy: "Best strategy",
    buy: "Buy",
    assetsProgression: "Assets progression",
    submit: "Calculate",
    help: {
      mortgageRate: "The Total Effective Cost of the mortgage encompasses the interest rates and the fees charged by the financial institution",
      rentRate: "Usually the inflation index",  
      currentSavings: "The total in financial investments",
      monthlyContribution: "The monthly contribution one commits to financing or rent, with the remainder being allocated to investments",
      investmentReturnRate: "The appreciation rate of the investments, which will also be applied to the monthly contributions",
      additionalMortageFees: "Other costs related to obtaining a mortage"
    },
    errors: {
      homePriceGreaterThanZero: "Home price must be greater than zero",
      mortageRateGreaterThanZero: "Mortage annual rate must be greater than zero",
      rentAmountGreaterThanZero: "Rent month amount must be greater than zero",
      periodInMonthsGreaterThanZero: "Period must be greater than zero",
      monthlyContributionIsLessThanMortageMonthlyPayment: "Monthly contribution is less than mortage monthly payment",
      monthlyContributionIsLessThanRentAmount: "Monthly contribution is less than Rent Amount",
      noFundsToBuy: "No funds to buy outright",
      noFundsToMortage: "No funds to acquire the mortage"  
    }
  }
};