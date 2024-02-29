import { Utility } from "./utility";

/* The mandatory format for any message */
export interface Message
{
    type: string;
    data: object;
    sequence: number;
}

/* Casts the given value into a message, throws an exception if the value is invalid */
export function expectMessage(value: any): Message
{
    // Expect the message to be a non-null object
    if (!Utility.isNonNullObject(value))
        throw new Error('Message is not a non-null object');

    // Expect type, data and sequence fields
    if (!Utility.isString(value.type))
        throw new Error('Message must contain a "type" field of string type');
    if (!Utility.isNonNullObject(value.data))
        throw new Error('Message must contain a "data" field of non-null object type');
    if (!Utility.isNumber(value.sequence))
        throw new Error('Message must contain a "sequence" field of number type');

    return value as Message;
}
