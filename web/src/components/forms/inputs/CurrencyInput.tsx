import React, { ChangeEvent } from 'react';
import InputProps from 'components/forms/inputs/IInputProps';
import { parseNumber, formatCurrency } from 'utils/stringUtils'
import { useInput } from 'utils/formUtils';

export const truncateToMaxDigits = (num: String, maxDigits = 15): string => {
    let str = num.toString();   
    // Check if the length of the string is greater than maxDigits
    if (str.length > maxDigits) {
        // slice from the end to get the last `maxDigits` characters
        return str.slice(-maxDigits); 
    }
    return num.toString();
};

const CurrencyInput: React.FC<InputProps> = ({ onChange, value, ...props }) => {

    const { inputRef } = useInput();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let currencyValue = e.target.value.toString();
        // If the cleanValue is beyond safe integer range, handle separately
        if (currencyValue.toString().length > 15) {
          currencyValue = truncateToMaxDigits(currencyValue.toString()); 
        }
        let inputValue = parseNumber(currencyValue.replace(/[^0-9]/g, '')) ?? 0;
        const formattedValue = formatCurrency(inputValue / 100);
        onChange?.(formattedValue);
        return formattedValue;
    };
    
    return <input   ref={inputRef}
                    type="text" 
                    value={value} 
                    className="form-control number" 
                    onChange={handleChange} 
                    placeholder="R$ 0,00" 
                    {...props} />;
};

export default CurrencyInput;
