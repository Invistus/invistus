import React, { ChangeEvent } from 'react';
import InputProps from 'components/form/InputProps';
import { parseNumber, formatPercentage } from 'components/utils/stringUtils';

const PercentageInput: React.FC<InputProps> = ({ value, onChange, ...props }) => {

    const handleKeyDown= (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Delete' || e.key === 'Backspace') {
            // Ignore percentage in case the user has deleted it
            if (e.currentTarget.value.length == e.currentTarget.selectionStart) {
                const newPosition = e.currentTarget.selectionStart - 1;
                e.currentTarget.setSelectionRange(newPosition, newPosition);
            }
        }
      };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue: number = parseNumber(e.target.value.replace(/[^0-9]/g, '')) ?? 0;
        const formattedValue = formatPercentage(inputValue / 100 / 100);
        onChange?.(formattedValue);
        return formattedValue;
    };

    return <input type="text" className="form-control number" value={value} onChange={handleChange} onKeyDown={handleKeyDown} {...props} placeholder="0%" />;
};

export default PercentageInput;
