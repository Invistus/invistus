import React from "react";

export interface SubmitProps {
     label: string
}

const Submit: React.FC<SubmitProps> = ({ label }) => {
    return (
        <button type="submit" className="btn btn-primary box-shadow">{ label }</button>
    )
}

export default Submit;