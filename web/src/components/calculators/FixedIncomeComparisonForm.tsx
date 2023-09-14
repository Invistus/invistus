import NumberInput from 'components/form/NumberInput';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

interface FormInputs {
  grossReturnPercentage: number;
  investmentDurationDays: number;
  investmentType: string;
}

const InvestmentComparisonForm: React.FC<{ onSubmit: (data: FormInputs) => void }> = ({ onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: async (data) => {
      const errors = {};

    //   if (!data.investmentType) {
    //     errors.investmentType = 'Investment type is required';
    //   }

    //   if (data.grossReturnPercentage <= 0) {
    //     errors.grossReturnPercentage = 'Invalid gross return percentage';
    //   }

    //   if (data.investmentDurationDays <= 0) {
    //     errors.investmentDurationDays = 'Invalid investment duration';
    //   }

      return { values: data, errors };
    },
  });

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
              <select {...field} className="form-control">
                <option value="" label="Select investment type" />
                <option value="CDB" label="CDB" />
                <option value="LCI/LCA" label="LCI/LCA" />
              </select>
            )}
          />
          {/* {errors.investmentType && <span>{errors.investmentType}</span>} */}
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
              <NumberInput
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
s          {/* {errors.grossReturnPercentage && <span>{errors.grossReturnPercentage}</span>} */}
        </div>
      </div>

      <div className="form-group form-group-btn">
        <button type="submit" className="btn-primary box-shadow">Calcular</button>
      </div>
    </form>
  );
};

export default InvestmentComparisonForm;
