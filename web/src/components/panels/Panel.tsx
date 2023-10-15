import React, { forwardRef } from "react";

export interface IPanel {
    title?: string,
    subTitle?: string,
    children?: any,
    className?: string,
    image?: string
}

const Panel: React.ForwardRefRenderFunction<HTMLDivElement, IPanel> = ({ title, subTitle, className, children, image }: IPanel, ref) => {
    return (
    <div ref={ref} className={`panel-container panel-shadow ${className || ""}`}>
        <div className="header">
            {image && <div className="image-header"><img src={image} alt={title} /></div>}
            <div>
                {title && <h1>{title}</h1>}
                {subTitle && <h3>{subTitle}</h3>}
            </div>
        </div>
        <div>
            { children && children }
        </div>
    </div>
    );
}

export default forwardRef(Panel);