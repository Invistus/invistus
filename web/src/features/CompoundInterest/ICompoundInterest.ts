import { FieldValues } from "react-hook-form";
import { getInputDefaults } from "utils/formUtils";

export type Period = 'month' | 'year';

export interface TemporalValueInputValue {
  period: Period;
  value: string;
}

export interface CompoundInterestFormProps {
    onCalculate: (data: CompoundInterestFormData) => void;
  }

export interface TemporalValue {
  period: Period;
  value: number;
}

export interface CompoundInterestInputValues extends FieldValues {
    principal: string;
    contribution: TemporalValueInputValue;
    rate: TemporalValueInputValue;
    period: TemporalValueInputValue;
  };

const { number, currency, percentage } = getInputDefaults();
export const defaultCompoundInterestInputValues: CompoundInterestInputValues = {
  principal: currency,
  contribution: {
      value: currency,
      period: 'month'
  },
  rate: {
      value: percentage,
      period: 'year'
  },
  period: {
      value: number,
      period: 'month'
  }
}
  
export interface CompoundInterestFormData extends FieldValues {
    principal: number;
    contribution: TemporalValue;
    rate: TemporalValue;
    period: TemporalValue;
  };

  export interface CalculateInterestParams {
    principal: number;
    contribution: TemporalValue;
    rate: TemporalValue;
    period: TemporalValue;
  }

  export interface PeriodAmount {
    amount: number,
    interest: number
  }
  export interface CalculationResult {
    totalAmount: number;
    interestAmount: number;
    periodAmount: PeriodAmount[];
  }
