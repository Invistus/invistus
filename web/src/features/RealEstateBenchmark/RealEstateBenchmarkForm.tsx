import React from 'react';
import { FieldErrors, FieldValues, useForm } from 'react-hook-form';
import { RealEstateStrategyInput } from './RealEstateBenchmark';
import NumberField from 'components/forms/fields/NumberField';
import useTranslation from 'language/useTranslation';
import ButtonGroup from 'components/forms/groups/ButtonGroup';
import Submit from 'components/forms/inputs/Submit';
import CurrencyField from 'components/forms/fields/CurrencyField';
import PercentageField from 'components/forms/fields/PercentageField';
import { getInputDefaults } from 'utils/formUtils';
import { parseCurrency, parsePercentage, parseNumber } from 'utils/stringUtils';
import { isNotEmpty } from 'utils/objectUtils';
import Form from 'components/forms/Form';


interface RealEstateBenchmarkInputValues extends FieldValues {
  homePrice: string;
  homeAppreciationRate: string;
  rentAmount: string;
  rentRate: string;
  currentSavings: string;
  monthlyContribution: string;
  mortgageRate: string;
  downPaymentPercentage: string;
  additionalMortageFees: string,
  investmentReturnRate: string;
  periodInMonths: string;
};

const { currency, percentage, number } = getInputDefaults();
const defaultValues: RealEstateBenchmarkInputValues =  {
  homePrice: currency,
  homeAppreciationRate: percentage,
  rentAmount: currency,
  rentRate: percentage,
  currentSavings: currency,
  monthlyContribution: currency,
  mortgageRate: percentage,
  downPaymentPercentage: percentage,
  additionalMortageFees: currency,
  investmentReturnRate: percentage,
  periodInMonths: number
}

interface FormProps {
  onSubmit: (data: RealEstateStrategyInput) => void; 
}

const RealEstateBenchmarkForm: React.FC<FormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<RealEstateBenchmarkInputValues, any, RealEstateStrategyInput>({
    defaultValues: defaultValues,
    resolver: async (inputValues: RealEstateBenchmarkInputValues) => {

      const formData: RealEstateStrategyInput = {
        homePrice: parseCurrency(inputValues.homePrice) || 0,
        homeAppreciationRate: parsePercentage(inputValues.homeAppreciationRate) || 0,
        rentAmount: parseCurrency(inputValues.rentAmount) || 0,
        rentRate: parsePercentage(inputValues.rentRate) || 0,
        currentSavings: parseCurrency(inputValues.currentSavings) || 0,
        monthlyContribution: parseCurrency(inputValues.monthlyContribution) || 0,
        mortgageRate: parsePercentage(inputValues.mortgageRate) || 0,
        downPaymentPercentage: parsePercentage(inputValues.downPaymentPercentage) || 0,
        investmentReturnRate: parsePercentage(inputValues.investmentReturnRate) || 0,
        periodInMonths: parseNumber(inputValues.periodInMonths) || 0,
        additionalMortageFees: parseCurrency(inputValues.additionalMortageFees) || 0
      };

      const errors: FieldErrors<RealEstateBenchmarkInputValues> = {};
      
      if (formData.homePrice <= 0) {
        errors.homePrice = {
            type: "manual",
            message: t('realEstateBenchmark.errors.homePriceGreaterThanZero')
          };    
      }   

      if (formData.mortgageRate <= 0) {
        errors.mortgageRate = {
            type: "manual",
            message: t('realEstateBenchmark.errors.mortgageRateGreaterThanZero')
          };    
      }   

      if (formData.rentAmount <= 0) {
        errors.rentAmount = {
            type: "manual",
            message: t('realEstateBenchmark.errors.rentAmountGreaterThanZero')
          };    
      }   

      if (formData.periodInMonths <= 0) {
        errors.periodInMonths = {
            type: "manual",
            message: t('realEstateBenchmark.errors.periodInMonthsGreaterThanZero')
          };    
      }         

      return {
        values: isNotEmpty(errors) ? {} : formData,
        errors: errors,
      };
    },
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)} errors={errors}>
      <p className="field-group">{t('realEstateBenchmark.realEstate')}</p>
      <CurrencyField control={control} name="homePrice" label={t('realEstateBenchmark.homePrice')}/>
      <PercentageField control={control} name="homeAppreciationRate" label={t('realEstateBenchmark.homeAppreciationRate')} />
      <p className="field-group">{t('realEstateBenchmark.mortage')}</p>
      <PercentageField control={control} name="mortgageRate" label={t('realEstateBenchmark.mortgageRate')} helpMessage={t('realEstateBenchmark.help.mortgageRate')}/>
      <PercentageField control={control} name="downPaymentPercentage" label={t('realEstateBenchmark.downPaymentPercentage')} />
      <CurrencyField control={control} name="additionalMortageFees" label={t('realEstateBenchmark.additionalMortageFees')} helpMessage={t('realEstateBenchmark.help.additionalMortageFees')}/>
      <p className="field-group">{t('realEstateBenchmark.rent')}</p>
      <CurrencyField control={control} name="rentAmount" label={t('realEstateBenchmark.rentAmount')} />
      <PercentageField control={control} name="rentRate" label={t('realEstateBenchmark.rentRate')} helpMessage={t('realEstateBenchmark.help.rentRate')}/>
      <p className="field-group">{t('realEstateBenchmark.investment')}</p>
      <CurrencyField control={control} name="currentSavings" label={t('realEstateBenchmark.currentSavings')} helpMessage={t('realEstateBenchmark.help.currentSavings')} />
      <CurrencyField control={control} name="monthlyContribution" label={t('realEstateBenchmark.monthlyContribution')} helpMessage={t('realEstateBenchmark.help.monthlyContribution')} />
      <PercentageField control={control} name="investmentReturnRate" label={t('realEstateBenchmark.investmentReturnRate')} helpMessage={t('realEstateBenchmark.help.investmentReturnRate')} />
      <p className="field-group">{t('realEstateBenchmark.period')}</p>
      <NumberField control={control} name="periodInMonths" label={t('realEstateBenchmark.periodInMonths')} />
      <ButtonGroup>
        <Submit label={t('realEstateBenchmark.submit')} />
      </ButtonGroup>      
    </Form>
  );
};

export default RealEstateBenchmarkForm;
