import { ILanguagePack } from 'language/translations/ILanguagePack';

export const pt: ILanguagePack = {
  errors: {
    fieldRequired: "Este campo é obrigatório",
    rateGreaterThanZero: "A taxa de juros deve ser maior que zero",
    calculationPeriodGreaterThanZero: "Período deve ser maior que zero",
    eitherPrincipalOrContribution: "Ao menos um dos campos valor inicial ou aportes periódicos deve ser preenchido"
  },
  compoundInterest: {
    title: "Juros Compostos"
  }
};