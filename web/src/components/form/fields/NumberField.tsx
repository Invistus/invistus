import React from "react";
import Field from "./Field";
import { Controller } from "react-hook-form";
import InputField from "./InputField";
import NumberInput from "../inputs/NumberInput";


const NumberField: React.FC<InputField<any>> = ({ onChange, value, name, control, ...props }) => {
    return (
        <Field {...props}>
            <Controller
                name={name}
                control={control}
                render={(field) => (
                <NumberInput
                    value={field.value}
                    onChange={field.onChange}
                />
                )}
            />
        </Field>
    );
}

export default NumberField;