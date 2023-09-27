import React from 'react';
import { useForm, FieldValues, FieldErrors } from 'react-hook-form';
import { parsePercentage, parseNumber } from 'utils/stringUtils';
import PercentageField from 'components/forms/fields/PercentageField';
import NumberField from 'components/forms/fields/NumberField';
import { InvestmentType, InvestmentCategory, IFixedIncomeBenchmark } from 'features/FixedIncomeBenchmark/FixedIncomeBenchmark';
import "react-datepicker/dist/react-datepicker.css";
import DateField from 'components/forms/fields/DateField';
import RadioGroupField from 'components/forms/fields/RadioGroupField';
import ButtonGroup from 'components/forms/groups/ButtonGroup';
import Submit from 'components/forms/inputs/Submit';
import Form from 'components/forms/Form';
import { isNotEmpty } from 'utils/objectUtils';
import useTranslation from 'language/useTranslation';
import { getInputDefaults } from 'utils/formUtils';


interface FixedIncomeBenchmarkInputValues extends FieldValues {
  investmentType: InvestmentType;
  investmentCategory: InvestmentCategory;
  investmentCategoryIndexPostFixed: string,
  investmentCategoryIndexIPCA: string,
  grossReturnPercentage: string;
  durationDays: string;
  dueDate?: Date;
};

const { number, percentage } = getInputDefaults();
const defaultFixedIncomeBenchmarkInputValues: FixedIncomeBenchmarkInputValues =  {
  investmentType: 'CDB',
  investmentCategory: 'pre_fixed',
  investmentCategoryIndexPostFixed: percentage,
  investmentCategoryIndexIPCA: percentage,
  durationDays: number,
  grossReturnPercentage: percentage,
  dueDate: new Date()
}

const FixedIncomeBenchmarkForm: React.FC<{ onSubmit: (data: IFixedIncomeBenchmark) => void }> = ({ onSubmit }) => {

  const { t } = useTranslation();

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FixedIncomeBenchmarkInputValues, any, IFixedIncomeBenchmark>({
    defaultValues: defaultFixedIncomeBenchmarkInputValues,
    resolver: async (inputValues: FixedIncomeBenchmarkInputValues) => {

      const formData: IFixedIncomeBenchmark = {
        investmentType: inputValues.investmentType,
        investmentCategory: inputValues.investmentCategory,
        investmentCategoryIndexPostFixed: parsePercentage(inputValues.investmentCategoryIndexPostFixed) || 0,
        investmentCategoryIndexIPCA: parsePercentage(inputValues.investmentCategoryIndexIPCA) || 0,
        durationDays: parseNumber(inputValues.durationDays) || 0,
        grossReturnPercentage: parsePercentage(inputValues.grossReturnPercentage) || 0,
        dueDate: inputValues.dueDate,
      };

      const errors: FieldErrors<FixedIncomeBenchmarkInputValues> = {};
      
      if (formData.investmentCategoryIndexPostFixed <= 0) {
        errors.investmentCategoryIndexPostFixed = {
            type: "manual",
            message: t('fixedIncomeBenchmark.errors.investmentCategoryIndexPostFixedGreaterThanZero')
          };    
      }   

      if (formData.investmentCategoryIndexIPCA <= 0) {
        errors.investmentCategoryIndexIPCA = {
            type: "manual",
            message: t('fixedIncomeBenchmark.errors.investmentCategoryIndexIPCAGreaterThanZero')
          };    
      }  

      if (formData.grossReturnPercentage <= 0) {
        errors.grossReturnPercentage = {
            type: "manual",
            message: t('fixedIncomeBenchmark.errors.grossReturnPercentageGreaterThanZero')
          };    
      }  

      if (formData.durationDays <= 0) {
        errors.durationDays = {
            type: "manual",
            message: t('fixedIncomeBenchmark.errors.durationDaysGreaterThanZero')
          };    
      }  

      return {
        values: isNotEmpty(errors) ? {} : formData,
        errors: errors,
      };
    },
  });
  

  const onChangeDueDate = (dueDate: Date | null) => {
    const durationDays = Math.ceil(((dueDate ?? new Date()).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    setValue('durationDays', (durationDays > 0 ? durationDays : 1).toString());
  }

  const onChangeDurationDays = (durationDays: number) => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + Number(durationDays));
    setValue('dueDate', newDate);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} errors={errors}>
     
      <RadioGroupField
          label={t('fixedIncomeBenchmark.investmentType')}
          name="investmentType"
          control={control}
          options={[
            { label: t('fixedIncomeBenchmark.cdb'), value: 'CDB' },
            { label: t('fixedIncomeBenchmark.lca_lci'), value: 'LCA/LCI' }
          ]}>
      </RadioGroupField>

      <RadioGroupField
          label={t('fixedIncomeBenchmark.investmentCategory')}
          name="investmentCategory"
          control={control}
          options={[
            { label: t('fixedIncomeBenchmark.pre_fixed'), value: "pre_fixed" },
            { label: t('fixedIncomeBenchmark.post_fixed'), value: "post_fixed" },
            { label: t('fixedIncomeBenchmark.inflation_linked'), value: "inflation_linked" }
          ]}>
      </RadioGroupField>

      <PercentageField
            label={t('fixedIncomeBenchmark.investmentCategoryIndexPostFixed')}
            name="investmentCategoryIndexPostFixed"
            control={control}
          />

        <PercentageField
            label={t('fixedIncomeBenchmark.investmentCategoryIndexIPCA')}
            name="investmentCategoryIndexIPCA"
            control={control}
          />

      <PercentageField
            label={t('fixedIncomeBenchmark.grossReturnPercentage')}
            name="grossReturnPercentage"
            control={control}
          />

      <NumberField
            label={t('fixedIncomeBenchmark.durationDays')}
            name="durationDays"
            onChange={onChangeDurationDays}
            control={control}
          />

      <DateField
            label={t('fixedIncomeBenchmark.dueDate')}
            name="dueDate"
            inputId="dueDate"
            minDate={new Date()}
            control={control}
            onChange={onChangeDueDate}    
          />

      <ButtonGroup>
        <Submit label={t('fixedIncomeBenchmark.submit')} />
      </ButtonGroup>

    </Form>
  );
};

export default FixedIncomeBenchmarkForm;
