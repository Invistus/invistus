import React from "react";
import { Controller } from "react-hook-form";
import ControlField, { ControlInputField } from "./Field";


export type RadioInput = { 
    label: string; 
    value: string; 
    checked?: boolean
}

export interface RadioGroupFieldProps extends ControlInputField {
    // Array of options for the radio buttons
    options: RadioInput[];
  }


const RadioGroupField: React.FC<RadioGroupFieldProps> = ({ onChange, name, control, options, ...props }: RadioGroupFieldProps) => {
    return (
      <ControlField {...props}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div>
              {options.map((option) => (
                    <div className="form-check form-check-inline">
                        <input 
                          className="form-check-input" 
                          type="radio" 
                          id={option.value}
                          checked={field.value === option.value}
                          onChange={() => {
                            onChange && onChange(option.value);
                            field.onChange(option.value);
                          }} />
                        <label className="form-check-label align-baseline" htmlFor={option.value}>
                            {option.label}
                        </label>
                    </div>
              ))}
            </div>
          )}
        />
      </ControlField>
    );
  };
  
  export default RadioGroupField;
  