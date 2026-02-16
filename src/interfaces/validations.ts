import { AnySchema } from 'yup';

export type Field = string | { [key: string]: string[] };

export type ValidationRule = { [key: string]: AnySchema };

export type ValidationShape = { [key: string]: AnySchema };

/**
 * Regular expressions used for input validation.
 *
 * @interface RegularExpressions
 * @property {RegExp} onlyNumber - Regular expression to validate that the input contains only numbers.
 * @property {RegExp} emailValid - Regular expression to validate email format.
 * @property {RegExp} numeric - Regular expression to validate numeric values, including decimals.
 * @property {RegExp} aliasValid - Regular expression to validate aliases (alphanumeric and underscores).
 * @property {RegExp} amountValid - Regular expression to validate monetary amounts (up to two decimal places).
 */
export interface RegularExpressions {
  onlyNumber: RegExp;
  emailValid: RegExp;
  numeric: RegExp;
  aliasValid: RegExp;
  amountValid: RegExp;
}
