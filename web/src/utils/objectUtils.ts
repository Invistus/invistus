export const isNotEmpty = (obj: any): boolean => {
    return obj !== undefined && Object.keys(obj).length > 0;
};
