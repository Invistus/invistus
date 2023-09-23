import React from "react";
import ControlField, { ControlInputField } from "./Field";
import { Controller } from "react-hook-form";
import CurrencyInput from "components/forms/inputs/CurrencyInput";

const CurrencyField: React.FC<ControlInputField> = ({ onChange, name, control, ...props }) => {
    return (
        <ControlField {...props}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                <CurrencyInput
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

export default CurrencyField;