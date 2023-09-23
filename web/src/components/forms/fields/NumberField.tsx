import React from "react";
import { Controller } from "react-hook-form";
import ControlField, { ControlInputField } from "./Field";
import NumberInput from "../inputs/NumberInput";


const NumberField: React.FC<ControlInputField> = ({ onChange, value, name, control, ...props }) => {
    return (
        <ControlField {...props}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                <NumberInput
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
}

export default NumberField;