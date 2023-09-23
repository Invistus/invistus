import React from "react";
import { Control } from "react-hook-form";
import InputProps from "../inputs/IInputProps";

/**
 * Information to render a control field.
 */
export interface ControlFieldProps extends InputProps {
    label: string;
    labelColumns?: number;
    valueColumns?: number;
}

/**
 * Attributes for controling an input.
 */
export interface ControlInputField extends ControlFieldProps {
    name: string;
    inputId?: string | undefined;
    control: Control<any, any>;
  }

const ControlField: React.FC<ControlFieldProps> = ({ label, labelColumns = 6, valueColumns = 6, children }) => {
    return (
        <div className="form-group row">
            <div className={`col-${labelColumns}`}>
            <label>{label}</label>
            </div>
            <div className={`col-${valueColumns}`}>
                {children}
            </div>
        </div>
    );
}

export default ControlField;