import React from "react";

export interface IPanel {
    title?: string,
    children?: any
}

const Panel: React.FC<IPanel> = ({ title, children }) => {
    return (
    <div className="panel-container panel-shadow ">
        {title && <h1>{title}</h1>}
        { children && children }
    </div>
    );
}

export default Panel;