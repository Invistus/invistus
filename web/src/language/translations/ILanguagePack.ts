export interface ILanguagePack {
    common: {
      result: string,
      more_about: string,
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
    fixedIncome: {
      label: string
    };
    fixedIncomeBenchmark: {
      label: string,
      resultLabel: string,
      cdb: string,
      lca_lci: string,
      pre_fixed: string,
      post_fixed: string,
      inflation_linked: string,
      investmentType: string,
      investmentCategory: string,
      investmentCategoryIndexPostFixed: string,
      investmentCategoryIndexIPCA: string,
      grossReturnPercentage: string,
      durationDays: string,
      dueDate: string,
      submit: string,
      tax_0_180_days: string,
      tax_181_360_days: string,
      tax_361_720_days: string,
      tax_above_720_days: string,
      dividendYield: string,
      tax_table: string,
      tax: string,
      netReturn: string,
      errors: {
        investmentCategoryIndexPostFixedGreaterThanZero: string,
        investmentCategoryIndexIPCAGreaterThanZero: string,
        durationDaysGreaterThanZero: string,
        grossReturnPercentageGreaterThanZero: string
      }
    };
    realEstateBenchmark: {
      label: string,
      realEstate: string,
      assets: string,
      homePrice: string,
      homeAppreciationRate: string,
      mortage: string,
      mortgageRate: string,
      downPaymentPercentage: string,
      additionalMortageFees: string,
      rent: string,
      rentAmount: string,
      rentRate: string,
      investment: string,
      currentSavings: string,
      monthlyContribution: string,
      investmentReturnRate: string,
      period: string,
      periodInMonths: string,
      strategy: string,
      bestStrategy: string,
      buy: string,
      assetsProgression: string,
      submit: string,
      help: {
        mortgageRate: string,
        rentRate: string,
        currentSavings: string,
        monthlyContribution: string,
        investmentReturnRate: string,
        additionalMortageFees: string
      },
      errors: {
        homePriceGreaterThanZero: string,
        mortageRateGreaterThanZero: string,
        rentAmountGreaterThanZero: string,
        periodInMonthsGreaterThanZero: string,
        monthlyContributionIsLessThanMortageMonthlyPayment: string,
        monthlyContributionIsLessThanRentAmount: string,
        noFundsToBuy: string,
        noFundsToMortage: string  
      }
    };
  }