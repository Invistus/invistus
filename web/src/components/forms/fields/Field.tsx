import React from "react";
import { Control } from "react-hook-form";
import InputProps from "../inputs/IInputProps";
import HelpIcon from "./HelpIcon";

/**
 * Information to render a control field.
 */
export interface ControlFieldProps extends InputProps {
    label: string;
    labelColumns?: number;
    valueColumns?: number;
    helpMessage?: string | undefined;
}

/**
 * Attributes for controling an input.
 */
export interface ControlInputField extends ControlFieldProps {
    name: string;
    inputId?: string | undefined;
    control: Control<any, any>;
  }

const ControlField: React.FC<ControlFieldProps> = ({ label, labelColumns = 6, valueColumns = 6, children, helpMessage }) => {
    return (
        <div className="form-group row">
            <div className={`col-${labelColumns}`}>
            <label>{label} {helpMessage && <HelpIcon message={helpMessage}/>}</label>
            </div>
            <div className={`col-${valueColumns}`}>
                {children}
            </div>
        </div>
    );
}

export default ControlField;