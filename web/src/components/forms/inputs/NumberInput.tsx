import React, { ChangeEvent } from 'react';
import InputProps from './IInputProps';
import { parseNumber, formatNumber } from 'utils/stringUtils';
import { useNumericInput } from 'utils/formUtils';

const NumberInput: React.FC<InputProps> = ({ value, onChange, ...props }) => {

    const { inputRef } = useNumericInput();
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue: number =  parseNumber(e.target.value.replace(/[^0-9]/g, '')) ?? 0;
        const formattedValue = formatNumber(inputValue, 0);
        onChange?.(formattedValue)
        return formattedValue;
    };

    return <input   ref={inputRef}
                    type="text" 
                    className="form-control number" 
                    value={value} 
                    onChange={handleChange} 
                    placeholder="0"
                    {...props}  />;
};

export default NumberInput;
