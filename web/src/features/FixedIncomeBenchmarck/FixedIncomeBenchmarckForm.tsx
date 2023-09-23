import React from 'react';
import { useForm, FieldValues, FieldErrors } from 'react-hook-form';
import { parsePercentage, parseNumber } from 'utils/stringUtils';
import PercentageField from 'components/forms/fields/PercentageField';
import NumberField from 'components/forms/fields/NumberField';
import { InvestmentType, InvestmentCategory, IFixedIncomeBenchmarck } from 'features/FixedIncomeBenchmarck/IFixedIncomeBenchmarck';
import "react-datepicker/dist/react-datepicker.css";
import DateField from 'components/forms/fields/DateField';
import RadioGroupField from 'components/forms/fields/RadioGroupField';
import ButtonGroup from 'components/forms/groups/ButtonGroup';
import Submit from 'components/forms/inputs/Submit';
import Form from 'components/forms/Form';
import { isNotEmpty } from 'utils/objectUtils';
import useTranslation from 'language/useTranslation';
import { getInputDefaults } from 'utils/formUtils';


interface FixedIncomeBenchmarckInputValues extends FieldValues {
  investmentType: InvestmentType;
  investmentCategory: InvestmentCategory;
  investmentCategoryIndexPostFixed: string,
  investmentCategoryIndexIPCA: string,
  grossReturnPercentage: string;
  durationDays: string;
  dueDate?: Date;
};

const { number, percentage } = getInputDefaults();
const defaultFixedIncomeBenchmarckInputValues: FixedIncomeBenchmarckInputValues =  {
  investmentType: 'CDB',
  investmentCategory: 'pre-fixed',
  investmentCategoryIndexPostFixed: percentage,
  investmentCategoryIndexIPCA: percentage,
  durationDays: number,
  grossReturnPercentage: percentage,
  dueDate: new Date()
}

const FixedIncomeBenchmarckForm: React.FC<{ onSubmit: (data: IFixedIncomeBenchmarck) => void }> = ({ onSubmit }) => {

  const { t } = useTranslation();

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FixedIncomeBenchmarckInputValues, any, IFixedIncomeBenchmarck>({
    defaultValues: defaultFixedIncomeBenchmarckInputValues,
    resolver: async (inputValues: FixedIncomeBenchmarckInputValues) => {

      const formData: IFixedIncomeBenchmarck = {
        investmentType: inputValues.investmentType,
        investmentCategory: inputValues.investmentCategory,
        investmentCategoryIndexPostFixed: parsePercentage(inputValues.investmentCategoryIndexPostFixed) || 0,
        investmentCategoryIndexIPCA: parsePercentage(inputValues.investmentCategoryIndexIPCA) || 0,
        durationDays: parseNumber(inputValues.durationDays) || 0,
        grossReturnPercentage: parsePercentage(inputValues.grossReturnPercentage) || 0,
        dueDate: inputValues.dueDate,
      };

      const errors: FieldErrors<FixedIncomeBenchmarckInputValues> = {};
      
      if (formData.investmentCategoryIndexPostFixed <= 0) {
        errors.investmentCategoryIndexPostFixed = {
            type: "manual",
            message: t('fixedIncomeBenchmarck.errors.investmentCategoryIndexPostFixedGreaterThanZero')
          };    
      }   

      if (formData.investmentCategoryIndexIPCA <= 0) {
        errors.investmentCategoryIndexIPCA = {
            type: "manual",
            message: t('fixedIncomeBenchmarck.errors.investmentCategoryIndexIPCAGreaterThanZero')
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
          label="Investment Type"
          name="investmentType"
          control={control}
          options={[
            { label: "CDB", value: "CDB" },
            { label: "LCI/LCA", value: "LCI/LCA" }
          ]}>
      </RadioGroupField>

      <RadioGroupField
          label="Investment Category"
          name="investmentCategory"
          control={control}
          options={[
            { label: "Pré-fixado", value: "pre-fixed" },
            { label: "Pós-fixado (CDI)", value: "pós-fixed" },
            { label: "Inflação (IPCA)", value: "inflation-linked" }
          ]}>
      </RadioGroupField>

      <PercentageField
            label="CDI (p.y.)"
            name="investmentCategoryIndexPostFixed"
            control={control}
          />

        <PercentageField
            label="IPCA (p.y.)"
            name="investmentCategoryIndexIPCA"
            control={control}
          />

      <PercentageField
            label="Gross Return Percentage"
            name="grossReturnPercentage"
            control={control}
          />

      <NumberField
            label="Investment Duration (Days)"
            name="durationDays"
            onChange={onChangeDurationDays}
            control={control}
          />

      <DateField
            label="Select Start Date"
            name="dueDate"
            inputId="dueDate"
            minDate={new Date()}
            control={control}
            onChange={onChangeDueDate}    
          />

      <ButtonGroup>
        <Submit label="Calcular" />
      </ButtonGroup>

    </Form>
  );
};

export default FixedIncomeBenchmarckForm;
