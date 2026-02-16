//Internal app
import { RegularExpressions } from '@/interfaces';

/**
 * Regular expressions
 * @label Tool for validating regular expressions - {@link https://regexr.com/}
 */
export const regularExpressions: Partial<RegularExpressions> = {
  onlyNumber: /^\d{2,20}$/,
  emailValid: /^[^@]{2,64}@[^_@]+\.[a-zA-Z]{2,}$/,
  numeric: /^\d+$/,
  aliasValid: /^[a-zA-Z0-9\s]+$/,
  amountValid: /^\d+(\.\d{1,2})?$/,
};
