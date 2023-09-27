import React from "react";

export interface ButtonGroupProps {
    children: any;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ children }) => {
    return (
        <div className="form-group form-group-btn">
            { children }
        </div>
    )
}

export default ButtonGroup;