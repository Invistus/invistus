import React, { useState, ChangeEvent } from 'react';
import InputProps from './InputProps';
import { parseNumber, formatNumber } from 'components/utils/stringUtils';

const NumberInput: React.FC<InputProps> = ({ value, onChange, ...props }) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue: number =  parseNumber(e.target.value.replace(/[^0-9]/g, '')) ?? 0;
        const formattedValue = formatNumber(inputValue, 0);
        onChange?.(formattedValue)
        return formattedValue;
    };

    return <input type="text" className="form-control number" value={value} onChange={handleChange} {...props} placeholder="0" />;
};

export default NumberInput;
