import React, { useState, ChangeEvent } from 'react';
import InputProps from './InputProps';

const truncateToMaxDigits = (num: String, maxDigits = 15): string => {
    let str = num.toString();
    
    // Check if the length of the string is greater than maxDigits
    if (str.length > maxDigits) {
        return str.slice(-maxDigits); // slice from the end to get the last `maxDigits` characters
    }
    
    return num.toString();
};

const CurrencyInput: React.FC<InputProps> = ({ onValueChange, ...props }) => {
    const [value, setValue] = useState<string>('');

    const formatCurrency = (value: string): string => {
        let cleanValue = value.replace(/[^0-9]/g, '');
        
        // If the cleanValue is beyond safe integer range, handle separately
        if (cleanValue.length > 15) {
            cleanValue = truncateToMaxDigits(cleanValue); 
        }

        let parsedValue = parseFloat(cleanValue);

        if (isNaN(parsedValue)) {
            return 'R$ 0,00';
        }

        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parsedValue / 100);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value.replace(/[^0-9\.]/g, '');
        const numericValue = parseFloat(inputValue);

        setValue(formatCurrency(inputValue));

        if (onValueChange) {
            onValueChange(isNaN(numericValue) ? 0 : numericValue); // Send the parsed value directly
        }
    };

    return <input type="text" className="form-control number" value={value} onChange={handleChange} {...props} placeholder="R$ 0,00" />;
};

export default CurrencyInput;
