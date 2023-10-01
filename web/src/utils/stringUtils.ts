
const DEFAULT_LOCALE = 'pt-BR';
const DEFAULT_CURRENCY = 'BRL';

const isValidNumber = (num: number | null) => num !== null && !isNaN(num);

/**
 * Converts a number to its string representation.
 * @param {number} num - The number to convert.
 * @returns {string} - The string representation of the number.
 */
export const toStringNumber = (num: number): string => String(num);

/**
 * Converts a string to a floating-point number.
 * @param {string} str - The string to convert.
 * @returns {number | null} - The floating-point number, or null if the conversion fails.
 */
export const toFloat = (str: string): number | null => {
      const parsed = parseFloat(str);
      return isValidNumber(parsed) ? parsed : null;
    };

/**
 * Converts a string to an integer.
 * @param {string} str - The string to convert.
 * @returns {number | null} - The integer, or null if the conversion fails.
 */
export const toInteger = (str: string): number | null => {
      const parsed = parseInt(str, 10);
      return isValidNumber(parsed) ? parsed : null;
    };
  
/**
 * Formats a number to a string with a specified number of decimal places and locale.
 * @param {number} num - The number to format.
 * @param {number} [decimalPlaces=2] - The number of decimal places.
 * @param {string} [locale=DEFAULT_LOCALE] - The locale for formatting.
 * @returns {string} - The formatted number.
 */
export const formatNumber = (num: number, decimalPlaces: number = 2, locale: string = DEFAULT_LOCALE): string => 
      new Intl.NumberFormat(locale, { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces }).format(num);

/**
 * Formats a number to a percentage string with a specified number of decimal places and locale.
 * @param {number} num - The number to format.
 * @param {number} [decimalPlaces=2] - The number of decimal places.
 * @param {string} [locale=DEFAULT_LOCALE] - The locale for formatting.
 * @returns {string} - The formatted percentage.
 */
export const formatPercentage = (num: number, decimalPlaces: number = 2, locale: string = DEFAULT_LOCALE): string => 
      new Intl.NumberFormat(locale, { style: 'percent', minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces }).format(num);

/**
 * Formats a number as currency using default locale and currency settings.
 * @param {number} value - The number to format as currency.
 * @returns {string} - The formatted currency string.
 */
export const formatCurrency = (value: number, decimalPlaces: number = 2, locale: string = DEFAULT_LOCALE, currency: string = DEFAULT_CURRENCY): string => {
        if (!value || isNaN(value)) {
          value = 0.0;
        }
        return new Intl.NumberFormat(locale, { style: 'currency', minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces, currency: currency }).format(value);
    };

/**
 * Parses a currency string into a number.
 * @param {string} currencyStr - The currency string to parse.
 * @param {string} [locale=DEFAULT_LOCALE] - The locale to use for parsing.
 * @returns {number | null} - The parsed number value, or null if the parsing fails.
 */
export const parseCurrency = (currencyStr: string, locale: string= DEFAULT_LOCALE): number | null => {
      const format = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' });
      const parts = format.formatToParts(12345.67);
  
      let groupSeparator: string | null = null;
      let decimalSeparator: string | null = null;
  
      for (const part of parts) {
        if (part.type === 'group') {
          groupSeparator = part.value;
        } else if (part.type === 'decimal') {
          decimalSeparator = part.value;
        }
      }
  
      if (groupSeparator && decimalSeparator) {
        const sanitizedStr = currencyStr?.replace(new RegExp(`\\${groupSeparator}`, 'g'), '')?.replace(new RegExp(`\\${decimalSeparator}`), '.')?.replace(/[^\d.-]/g, '');
        const value = sanitizedStr !== undefined ? toFloat(sanitizedStr) : null;
        return isValidNumber(value) ? value : null;
      }
    
      return null;
    }

/**
 * Parses a percentage string into a number.
 * @param {string} str - The percentage string to parse.
 * @returns {number | null} - The parsed percentage as a number, or null if the parsing fails.
 */
export const parsePercentage = (str: string): number | null => {
      const percent = parseNumber(str?.replace('%', ''));
      return percent ? percent / 100 : null;
    };
  
/**
 * Parses a string into a number.
 * @param {string} str - The string to parse.
 * @param {locale} [locale=DEFAULT_LOCALE] - Number locale to be parsed.
 * @returns {number | null} - The parsed number, or null if the parsing fails.
 */
export const parseNumber = (str: string, locale: string = DEFAULT_LOCALE): number | null => {
    if (!str) return null;

    // Create a formatter for the locale
    const format = new Intl.NumberFormat(locale);
    
    // Get the decimal and group separators from the formatted 12345.6
    const parts = format.formatToParts(12345.6);
    
    let groupSeparator: string | null = null;
    let decimalSeparator: string | null = null;
    
    for (const part of parts) {
      if (part.type === 'group') {
        groupSeparator = part.value;
      } else if (part.type === 'decimal') {
        decimalSeparator = part.value;
      }
    }

    if (groupSeparator && decimalSeparator) {
      // Create a regular expression that removes group separators and replaces decimal separators with "."
      const sanitizedStr = str
        .replace(new RegExp(`\\${groupSeparator}`, 'g'), '')
        .replace(new RegExp(`\\${decimalSeparator}`), '.');
      
      // Parse the sanitized string to a number
      const value = parseFloat(sanitizedStr);
      return isNaN(value) ? null : value;
    }
    return null;
}

/**
 * Formats an error message by replacing placeholders in the message with data.
 * 
 * The function expects placeholders in the message to be in the format [key], 
 * where "key" is a property name in the provided data object. It will replace 
 * each [key] in the message with the corresponding value from the data object.
 * 
 * Example:
 *  - message: "User [name] has [status]."
 *  - data: { name: 'John', status: 'active' }
 *  Result: "User John has active."
 * 
 * @param {string} message - The error message containing placeholders wrapped in square brackets.
 * @param {any} data - An object containing key-value pairs to replace the placeholders in the message.
 * 
 * @returns {string} - The formatted message with placeholders replaced by actual data values.
 */
export const formatErrorMessage = (message: string, data: any) => {
  let result = message;
  for (const key in data) {
    const replaceKey = `[${key}]`; // create a replaceable key with square brackets
    result = result.replace(replaceKey, data[key]); // replace each key in the string with its value
  }
  return result;
}