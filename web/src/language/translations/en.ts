import { ILanguagePack } from 'language/translations/ILanguagePack';

export const en: ILanguagePack = {
  common: {
    result: "Result",
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
  fixedIncomeBenchmarck: {
    label: "CDB vs LCA/LCI",
    errors: {
      investmentCategoryIndexPostFixedGreaterThanZero: "CDI must be greater than zero",
      investmentCategoryIndexIPCAGreaterThanZero: "IPCA must be greater than zero"
    }
  }  
};