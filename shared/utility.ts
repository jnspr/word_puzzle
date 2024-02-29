/* Various helper functions */
export class Utility
{
    /* Returns whether the given value is a non-null object or not */
    public static isNonNullObject(value: any): boolean
    {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    }

    /* Returns whether the given value is a number or not */
    public static isNumber(value: any)
    {
        return typeof value === 'number';
    }

    /* Returns whether the given value is a string or not */
    public static isString(value: any)
    {
        return typeof value === 'string';
    }
}
