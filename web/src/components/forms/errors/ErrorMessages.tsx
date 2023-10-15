import React, { forwardRef } from 'react';
import { FieldErrors } from 'react-hook-form';

interface ErrorMessagesProps {
  errors: FieldErrors;
}

const isNotEmpty = (obj: FieldErrors): boolean => {
  return Object.keys(obj).length > 0;
};

const ErrorMessages: React.ForwardRefRenderFunction<HTMLDivElement, ErrorMessagesProps> = ({ errors }, ref) => {
  if (!isNotEmpty(errors)) return null;
  return (
    <div ref={ref}>
        <div className="error-validation alert alert-warning">
          <div className="alert-warning-icon">
            <i className="fa-solid fa-circle-exclamation fa-3x"></i>
          </div>
          <ul>
            {Object.getOwnPropertyNames(errors).map((prop, index) => (
              <li key={index}>{errors[prop]?.message?.toString()}</li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default forwardRef(ErrorMessages);
