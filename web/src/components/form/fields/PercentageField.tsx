import React from "react";
import Field from "./Field";
import { Controller } from "react-hook-form";
import InputField from "./InputField";
import PercentageInput from "../inputs/PercentageInput";


const PercentageField: React.FC<InputField, any> = ({ name, control, ...props }) => {
    return (
        <Field {...props}>
            <Controller
                name={name}
                control={control}
                render={(field) => (
                <PercentageInput
                    value={field.value}
                    onChange={field.onChange}
                />
                )}
            />
        </Field>
    );
}

export default PercentageField;