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
    description: "Calcule e entenda o poder dos juros compostos",
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
    description: "Compare e escolha o melhor investimento",
    resultLabel: "Benchmark com o prazo de [durationDays] dia(s)",
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
    tax_above_720_days: "Acima de 720 dias",
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
  },
  realEstateBenchmark: {
    label: "Comprar, Financiar ou Alugar Imóvel",
    description: "Simule e descubra a melhor escolha para você",
    realEstate: "Imóvel",
    assets: "Patrimônio",
    homePrice: "Valor do imóvel",
    homeAppreciationRate: "Taxa anual de valorização",
    mortage: "Financiamento",
    mortgageRate: "Taxa anual (CET)",
    downPaymentPercentage: "Percentual de entrada",
    additionalMortageFees: "Custo adicional para financiamento",
    rent: "Aluguel",
    rentAmount: "Valor mensal do aluguel",
    rentRate: "Taxa de reajuste anual",
    investment: "Investimento",
    currentSavings: "Aplicação atual",
    monthlyContribution: "Renda mensal",
    investmentReturnRate: "Taxa de reajuste anual",
    period: "Período",
    periodInMonths: "Período em meses",
    strategy: "Estratégia",
    bestStrategy: "Melhor estratégia",
    buy: "Compra à vista",
    assetsProgression: "Evolução patrimonial",
    submit: "Calcular",
    help: {
      mortgageRate: "Custo Efetivo Total do financiamento imobiliário abrange as taxas de juros e os encargos cobrados pela instituição financeira",
      rentRate: "O índice mais comumente usado para este propósito é o IGP-M (Índice Geral de Preços do Mercado)",  
      currentSavings: "O total em investimentos financeiros. Este valor é utilizado na compra à vista ou como entrada do financiamento no cálculo",
      monthlyContribution: "O aporte mensal que se compromente com o financiamento ou o aluguel. Sendo o restante destinado à investimentos.",
      investmentReturnRate: "A taxa de valorização dos investimentos e será aplicado também aos aportes mensais",
      additionalMortageFees: "Outros custos relacionados à aquisição de um financiamento, como o TAC"
    },
    errors: {
      homePriceGreaterThanZero: "Valor do imóvel deve ser maior que zero",
      mortageRateGreaterThanZero: "Taxa anual de reajuste do financiamento deve ser maior que zero",
      rentAmountGreaterThanZero: "Valor mensal do aluguel deve ser maior que zero",
      periodInMonthsGreaterThanZero: "período em meses deve ser maior que zero",
      monthlyContributionIsLessThanMortageMonthlyPayment: "Renda mensal [monthlyContribution] não suporta parcela do financiamento de [monthlyPayment] no mês [period]",
      monthlyContributionIsLessThanRentAmount: "Renda mensal [monthlyContribution] não suporta parcela do aluguel de [rentAmount] no mês [period]",
      noFundsToBuy: "Sem fundos para pagamento à vista",
      noFundsToMortage: "Sem fundos para para pagar a entrada do financiamento",  
    }
  }
};