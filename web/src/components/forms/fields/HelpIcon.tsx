import React, { useState } from 'react';

interface HelpIconProps {
  message: string;
}

const HelpIcon: React.FC<HelpIconProps> = ({ message }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <span 
      className="help-icon ml-2 text-muted" 
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip(!showTooltip)}
    >
      <i className="fa fa-question-circle"></i>
      {showTooltip && (
        <div className="help-icon-message position-absolute mt-2 p-2 border bg-white rounded box-shadow">
          {message}
        </div>
      )}
    </span>
  );
}

export default HelpIcon;
