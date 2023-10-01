import React from "react";

export interface IPanel {
    title?: string,
    subTitle?: string,
    children?: any,
    className?: string
}

const Panel: React.FC<IPanel> = ({ title, subTitle, className, children }) => {
    return (
    <div className={`panel-container panel-shadow ${className || ""}`}>
        {title && <h1>{title}</h1>}
        {subTitle && <h2>{subTitle}</h2>}
        { children && children }
    </div>
    );
}

export default Panel;