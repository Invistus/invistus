// TODO calculate result
// TODO validate input
// TODO handle errors
// TODO translate

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import { parsePercentage } from 'components/utils/stringUtils';
import { IFixedIncomeComparison, InvestmentType, InvestmentCategory } from 'services/fixedIncomeComparison';
import "react-datepicker/dist/react-datepicker.css";
import PercentageInput from 'components/form/inputs/PercentageInput';
import PercentageField from 'components/form/fields/PercentageField';


type InputValues = {
  investmentType: InvestmentType;
  investmentCategory: InvestmentCategory;
  index: string;
  grossReturnPercentage: string;
  durationDays: number;
  dueDate?: Date;
};

const FixedIncomeComparisonForm: React.FC<{ onSubmit: (data: IFixedIncomeComparison) => void }> = ({ onSubmit }) => {

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<InputValues, any, IFixedIncomeComparison>({
    defaultValues: {
      investmentType: 'CDB',
      investmentCategory: 'pre-fixed',
      index: '0%',
      durationDays: 0,
      grossReturnPercentage: '0%',
      dueDate: new Date()
    },
    resolver: async (inputValues: InputValues) => {
      const errors = {};
      
      // if (!data.type) {
      //   errors.type = 'Investment type is required';
      // }
  
      // if (data.investmentDurationDays < 1) {
      //   errors.investmentDurationDays = 'Investment duration must be at least 1 day';
      // }

      const formData: IFixedIncomeComparison = {
        investmentType: inputValues.investmentType,
        investmentCategory: 'pre-fixed',
        durationDays: inputValues.durationDays,
        grossReturnPercentage: parsePercentage(inputValues.grossReturnPercentage)!!,
        dueDate: inputValues.dueDate,
      };
  
      return { values: formData, errors };
    },
  });
  

  const onChangeDueDate = (dueDate: Date | null) => {
    const durationDays = Math.ceil(((dueDate ?? new Date()).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    setValue('durationDays', durationDays > 0 ? durationDays : 1);
  }

  const onChangeDurationDays = (durationDays: number) => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + Number(durationDays));
    setValue('dueDate', newDate);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group row">
        <div className="col-6">
          <label>Investment Type</label>
        </div>
        <div className="col-6">
          <Controller
            name="investmentType"
            control={control}
            render={({ field }) => (
              <>
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    id="CDB" 
                    defaultChecked
                    {...field}
                  />
                  <label className="form-check-label align-baseline" htmlFor="CDB">
                    CDB
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    id="LCI/LCA"                     
                    {...field}
                  />
                  <label className="form-check-label align-baseline" htmlFor="LCI/LCA">
                    LCI/LCA
                  </label>
                </div>
                </>
            )}
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-6">
          <label>Investment Category</label>
        </div>
        <div className="col-6">
          <Controller
            name="investmentCategory"
            control={control}
            render={({ field }) => (
              <>
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    id="pre-fixed" 
                    defaultChecked
                    {...field}
                  />
                  <label className="form-check-label align-baseline" htmlFor="pre-fixed">
                    Pré-fixado
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    id="post-fixed" 
                    {...field}
                  />
                  <label className="form-check-label align-baseline" htmlFor="post-fixed">
                    Pós-fixado (CDI)
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    id="inflation-linked" 
                    {...field}
                  />
                  <label className="form-check-label align-baseline" htmlFor="inflation-linked">
                    Inflação (IPCA)
                  </label>
                </div>
                </>
            )}
          />
        </div>
      </div>


      <PercentageField
            label="Investment Category"
            name="index"
            control={control}
          />

      <div className="form-group row">
        <div className="col-6">
          <label>Index</label>
        </div>
        <div className="col-6">
          <Controller
            name="index"
            control={control}
            render={({ field }) => (
              <PercentageInput
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>

      <div className="form-group row">
        <div className="col-6">
          <label>Gross Return Percentage</label>
        </div>
        <div className="col-6">
          <Controller
            name="grossReturnPercentage"
            control={control}
            render={({ field }) => (
              <PercentageInput
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>

      <div className="form-group row">
        <div className="col-6">
          <label>Investment Duration (Days)</label>
        </div>
        <div className="col-6">
          <Controller
            name="durationDays"
            control={control}
            render={({ field }) => (
              <NumberInput 
                id="durationDays"
                value={field.value} 
                onChange={(value) => {
                  onChangeDurationDays(value);
                  field.onChange(value);
                }} />
            )}
          />
        </div>
      </div>

      <div className="form-group row">
        <div className="col-6">
          <label>Select Start Date</label>
        </div>
        <div className="col-6">
          <Controller
              name="dueDate"
              control={control}
              defaultValue={new Date()}
              render={({ field }) => (
                <DatePicker
                  id="dueDate"
                  locale={ptBR}
                  dateFormat="P"
                  selected={field.value}
                  className="form-control"
                  minDate={new Date()}
                  onChange={(value) => {
                    onChangeDueDate(value);
                    field.onChange(value);
                  }}                 
                />
              )}
            />
        </div>
      </div>

      <div className="form-group form-group-btn">
        <button type="submit" className="btn btn-primary box-shadow">Calcular</button>
      </div>
    </form>
  );
};

export default FixedIncomeComparisonForm;
