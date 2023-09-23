import React, { ChangeEvent } from 'react';
import InputProps from 'components/forms/inputs/IInputProps';
import { parseNumber, formatPercentage } from 'utils/stringUtils';
import { useInput } from 'utils/formUtils';

const PercentageInput: React.FC<InputProps> = ({ value, onChange, ...props }) => {

    const { inputRef } = useInput();

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

    return <input   ref={inputRef}
                    type="text" 
                    className="form-control number" 
                    value={value} 
                    onChange={handleChange} 
                    onKeyDown={handleKeyDown} 
                    placeholder="0%"
                    {...props} />;
};

export default PercentageInput;
