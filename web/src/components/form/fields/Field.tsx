import React from "react";
import InputProps from "../inputs/InputProps";


export interface FieldProps extends InputProps {
    label: string,
    labelColumns: number,
    valueColumns: number
}

const Field: React.FC<FieldProps> = ({ label, labelColumns = 6, valueColumns = 6, children }) => {
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

export default Field;