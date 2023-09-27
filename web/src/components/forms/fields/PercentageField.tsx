import React from "react";
import { Controller } from "react-hook-form";
import ControlField, { ControlInputField } from "components/forms/fields/Field";
import PercentageInput from "components/forms/inputs/PercentageInput";


const PercentageField: React.FC<ControlInputField>  = ({ onChange, name, control, ...props }: ControlInputField) => {
    return (
      <ControlField {...props}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <PercentageInput
                value={field.value}
                onChange={(value) => {
                  onChange && onChange(value);
                  field.onChange(value);
              }}
            />
          )}
        />
      </ControlField>
    );
  };
  

export default PercentageField;