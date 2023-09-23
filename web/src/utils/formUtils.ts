import { useRef, useEffect } from 'react';
import { formatNumber, formatCurrency, formatPercentage } from "./stringUtils";

type DefaultInputValues = {
    number: string;
    currency: string;
    percentage: string;
};

let defaultInstance: DefaultInputValues | null = null;

export const getInputDefaults = (): DefaultInputValues => {
    if (!defaultInstance) {
        defaultInstance = {
            number: formatNumber(0, 0),
            currency: formatCurrency(0, 2),
            percentage: formatPercentage(0, 2),
        };
    }
    return defaultInstance;
}


export const useInput = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleFocus = (event: Event) => {
            const input = event.target as HTMLInputElement;
            const length = input.value.length;
            input.setSelectionRange(length, length);
        };
    
        const currentInput = inputRef.current;
        if (currentInput) {
            currentInput.addEventListener('focus', handleFocus);
            return () => {
                currentInput.removeEventListener('focus', handleFocus);
            };
        }
    }, []);    

    return { inputRef };
};
