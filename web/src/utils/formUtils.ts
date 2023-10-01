import { useRef, useEffect } from 'react';
import { formatNumber, formatCurrency, formatPercentage } from "./stringUtils";

type DefaultInputValues = {
    number: string;
    currency: string;
    percentage: string;
};

let defaultInstance: DefaultInputValues | null = null;

/**
 * Retrieves default formatted values for numeric input types.
 * 
 * Uses lazy instantiation to create a single instance of default values 
 * to avoid recalculating them every time the function is called.
 * 
 * @returns {DefaultInputValues} An object containing default formatted values.
 */
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

/**
 * Custom hook to manage numeric input fields.
 * 
 * When an input field managed by this hook gains focus, the cursor position 
 * will automatically move to the end of the input value.
 * 
 * @returns {object} An object containing the inputRef which should be attached to the input field.
 */
export const useNumericInput = () => {
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
