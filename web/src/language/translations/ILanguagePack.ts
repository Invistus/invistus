export interface ILanguagePack {
    common: {
      result: string,
      errors: {
        fieldRequired: string;
        rateGreaterThanZero: string;
      };
    };
    compoundInterest: {
      label: string,
      principal: string,
      contribution: string,
      rate: string,
      period: string,
      submit: string,
      errors: {
        calculationPeriodGreaterThanZero: string;
        eitherPrincipalOrContribution: string;
      };  
    };
    fixedIncomeBenchmarck: {
      label: string,
      errors: {
        investmentCategoryIndexPostFixedGreaterThanZero: string
        investmentCategoryIndexIPCAGreaterThanZero: string
      }
    };
  }