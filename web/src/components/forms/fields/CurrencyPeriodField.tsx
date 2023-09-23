import React from "react";
import { Controller } from "react-hook-form";
import ControlField, { ControlInputField } from "components/forms/fields/Field";
import CurrencyInput from "../inputs/CurrencyInput";


const CurrencyPeriodField: React.FC<ControlInputField>  = ({ onChange, name, control, ...props }: ControlInputField) => {
    return (
      <ControlField {...props}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className="input-group">
              <CurrencyInput
                  value={field.value.value}
                  onChange={(value) => {
                    onChange && onChange(value);
                    field.onChange({
                      value: value,
                      period: field.value.period
                    });
                }}
              />
              <select className="input-side-button" 
                      value={field.value.period} 
                      onChange={(period) => field.onChange({
                        value: field.value.value,
                        period: period.target.value
                      })}>
                <option value="year">Anual</option>
                <option value="month">Mensal</option>
              </select>            
            </div>
          )}
        />
      </ControlField>
    );
  };
  

export default CurrencyPeriodField;