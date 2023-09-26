import { ILanguagePack } from 'language/translations/ILanguagePack';

export const pt: ILanguagePack = {
  common: {
    result: "Resultado",
    more_about: "Veja mais sobre o tema...",
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
  fixedIncome: {
    label: "Renda fixa"
  },
  fixedIncomeBenchmark: {
    label: "CDB x LCA/LCI",
    resultLabel: "Benchmark com o prazo de [durationDays] days",
    cdb: "CDB",
    lca_lci: "LCA/LCI",
    pre_fixed: 'Pré-fixado',
    post_fixed: 'Pós-fixado (CDI)',
    inflation_linked: 'Inflação (IPCA)',
    investmentType: "Tipo",
    investmentCategory: "Categoria",
    investmentCategoryIndexPostFixed: "CDI (anual)",
    investmentCategoryIndexIPCA: "IPCA (anual)",
    grossReturnPercentage: "Taxa de Juros",
    durationDays: "Prazo (dias)",
    dueDate: "Data Resgate",
    submit: "Calcular",
    tax_0_180_days: "0 à 180 dias",
    tax_181_360_days: "181 à 360 dias",
    tax_361_720_days: "361 à 720 dias",
    dividendYield: "Dividend Yield",
    tax_table: "Tabela IR",
    tax: "IR",
    netReturn: "Retorno Efetivo",
    errors: {
      investmentCategoryIndexPostFixedGreaterThanZero: "CDI deve ser maior que zero",
      investmentCategoryIndexIPCAGreaterThanZero: "IPCA deve ser maior que zero",
      grossReturnPercentageGreaterThanZero: "Taxa de juros deve ser maior que zero",
      durationDaysGreaterThanZero: "Prazo deve ser maior que zero",   
    }
  }    
};