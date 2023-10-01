/**
 * Checks if the provided object is not empty.
 * 
 * The function considers an object to be "not empty" if:
 * 1. It is not undefined.
 * 2. It has one or more own enumerable properties (keys).
 * 
 * This function is commonly used to determine if an object has any properties or not.
 * 
 * Example:
 *  - obj: {} -> Returns false
 *  - obj: { name: 'John' } -> Returns true
 * 
 * @param {any} obj - The object to be checked.
 * 
 * @returns {boolean} - Returns true if the object is not empty, otherwise false.
 */
export const isNotEmpty = (obj: any): boolean => {
    return obj != null && obj !== undefined && Object.keys(obj).length > 0;
};
