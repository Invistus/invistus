import React from "react";

export interface IPanel {
    title?: string,
    children?: any,
    className?: string
}

const Panel: React.FC<IPanel> = ({ title, className, children }) => {
    return (
    <div className={`panel-container panel-shadow ${className || ""}`}>
        {title && <h1>{title}</h1>}
        { children && children }
    </div>
    );
}

export default Panel;