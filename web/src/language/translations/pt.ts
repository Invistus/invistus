import { ILanguagePack } from 'language/translations/ILanguagePack';

export const pt: ILanguagePack = {
  common: {
    result: "Resultado",
    errors: {
      fieldRequired: "Este campo é obrigatório",
      rateGreaterThanZero: "A taxa de juros deve ser maior que zero"
    }  
  },
  compoundInterest: {
    label: "Juros Compostos",
    principal: "Valor Inicial",
    contribution: "Aportes periódicos",
    rate: "Taxa de juros",
    period: "Período",
    submit: "Calcular",
    errors: {
      calculationPeriodGreaterThanZero: "Período deve ser maior que zero",
      eitherPrincipalOrContribution: "Ao menos um dos campos valor inicial ou aportes periódicos deve ser preenchido"
    }  
  },
  fixedIncomeBenchmarck: {
    label: "CDB x LCA/LCI",
    errors: {
      investmentCategoryIndexPostFixedGreaterThanZero: "CDI deve ser maior que zero",
      investmentCategoryIndexIPCAGreaterThanZero: "IPCA deve ser maior que zero"
    }
  }    
};