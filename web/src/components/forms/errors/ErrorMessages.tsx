import React from 'react';
import { FieldErrors } from 'react-hook-form';

interface ErrorMessagesProps {
  errors: FieldErrors;
}

const isNotEmpty = (obj: FieldErrors): boolean => {
  return Object.keys(obj).length > 0;
};

const ErrorMessages: React.FC<ErrorMessagesProps> = ({ errors }) => {
  if (!isNotEmpty(errors)) return null;
  return (
    <div>
        <div className="errorValidation alert alert-warning">
          <ul>
            {Object.getOwnPropertyNames(errors).map((prop, index) => (
              <li key={index}>{errors[prop]?.message?.toString()}</li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default ErrorMessages;
