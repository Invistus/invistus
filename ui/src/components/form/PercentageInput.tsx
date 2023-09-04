import React, { useState, ChangeEvent } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    onValueChange?: (value: number) => void;
}

const PercentageInput: React.FC<Props> = ({ onValueChange, ...props }) => {
    const [value, setValue] = useState<string>('');

    const formatPercentage = (value: string): string => {
        let cleanValue = parseFloat(value.replace(/[^0-9]/g, ''));

        if (isNaN(cleanValue)) {
            cleanValue = 0;
        }

        return `${Intl.NumberFormat('pt-BR').format(cleanValue / 100)}%`;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value.replace(/[^0-9]/g, '');
        // Remove right-most number if the user is removing
        if (!e.target.value.includes('%') && inputValue.length > 2) {
            inputValue = inputValue.slice(0, -1);
        }
        const numericValue = parseFloat(inputValue);

        setValue(formatPercentage(inputValue));

        if (onValueChange) {
            onValueChange(isNaN(numericValue) ? 0 : numericValue / 100); // Convert percentage to fraction
        }
    };

    return <input type="text" className="form-control number" value={value} onChange={handleChange} {...props} placeholder="0%" />;
};

export default PercentageInput;
