import React from "react";
import Field from "./Field";
import { Controller } from "react-hook-form";
import CurrencyInput from "../inputs/CurrencyInput";
import { InputField } from "./InputField";


const CurrencyField: React.FC<InputField> = ({ onChange, value, name, control, ...props }) => {
    return (
        <Field {...props}>
            <Controller
                name={name}
                control={control}
                render={() => (
                <CurrencyInput
                    value={value}
                    onChange={onChange}
                />
                )}
            />
        </Field>
    );
}

export default CurrencyField;