export interface ILanguagePack {
    errors: {
      fieldRequired: string;
      rateGreaterThanZero: string;
      calculationPeriodGreaterThanZero: string;
      eitherPrincipalOrContribution: string;      
    };

    compoundInterest: {
      title: string
    }
  }