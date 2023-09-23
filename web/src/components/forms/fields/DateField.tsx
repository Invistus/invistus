import React from "react";
import { Controller } from "react-hook-form";
import ControlField, { ControlInputField } from "./Field";
import DatePicker from 'react-datepicker';
import { ptBR } from 'date-fns/locale';

export interface ControlDateField extends ControlInputField {
    minDate? : Date | null | undefined;
    dateFormat? : string | undefined;
}

const DateField: React.FC<ControlDateField> = ({ onChange, name, minDate, dateFormat = 'P', inputId, control, ...props }) => {
    return (
        <ControlField {...props}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <DatePicker
                        id={inputId}
                        className="form-control"
                        locale={ptBR}
                        dateFormat={dateFormat}
                        selected={field.value}
                        minDate={minDate}
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

export default DateField;