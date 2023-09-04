import React, { useState, ChangeEvent } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    onValueChange?: (value: number) => void;
}

const NumberInput: React.FC<Props> = ({ onValueChange, ...props }) => {
    const [value, setValue] = useState<string>('');

    const formatNumber = (value: string): string => {
        // Remove all non-digit characters
        const cleanValue = parseInt(value.replace(/[^0-9]/g, ''), 10);

        if (isNaN(cleanValue)) {
            return '0';
        }

        // Format using Brazilian number formatting
        return new Intl.NumberFormat('pt-BR').format(cleanValue);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/[^0-9]/g, '');
        const numericValue = parseInt(inputValue, 10);

        setValue(formatNumber(inputValue));

        if (onValueChange) {
            onValueChange(isNaN(numericValue) ? 0 : numericValue);
        }
    };

    return <input type="text" className="form-control number" value={value} onChange={handleChange} {...props} placeholder="0" />;
};

export default NumberInput;
