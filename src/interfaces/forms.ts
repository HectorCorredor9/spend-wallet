import React from 'react';
import { Dayjs } from 'dayjs';
import { OutlinedInputProps, SxProps } from '@mui/material';
import { DateView, DesktopDatePickerProps } from '@mui/x-date-pickers';
import { Control, FieldErrors, FieldValues } from 'react-hook-form';

/**
 * Form global variables
 *
 * @typeParam name: string
 * @typeParam label (Optional): string
 * @typeParam labelError (Optional): string
 * @typeParam error (Optional): FieldErrors;
 * @typeParam value (Optional): string | number | FieldValues;
 * @typeParam onChange (Optional): (...e: unknown[]) => void
 * @typeParam type (Optional): string
 * @typeParam control (Optional): Control;
 * @typeParam disabled (Optional): boolean
 * @typeParam readOnly (Optional): boolean
 * @typeParam multiline: boolean - **Indicates if the field is multiline**
 * @typeParam rows: number - **Number of visible rows**
 */

export interface FormMUIProps {
  name: string;
  label?: string;
  labelError?: string | React.ReactNode;
  error?: FieldErrors;
  value?: string | number | FieldValues | Date | Dayjs;
  onChange?: (..._e: unknown[]) => void;
  type?: string;
  control?: Control<any>;
  disabled?: boolean;
  readOnly?: boolean;
  sx?: SxProps;
  startAdornment?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
}

/**
 * TextField input
 *
 * @typeParam optional (Optional): boolean - **Indicates if the field is optional**
 * @typeParam additionalInfo (Optional): boolean - **Indicates if additional information is provided**
 * @typeParam colorText (Optional): string - **Color of the text**
 * @typeParam endAdornment (Optional): React.ReactNode - **Element to display at the end of the input**
 * @typeParam inputProperties (Optional): OutlinedInputProps - **Properties for the input element**
 * @typeParam toggleAction (Optional): () => void - **Action to perform on toggle**
 */
export interface TextFieldProps extends FormMUIProps {
  optional?: boolean;
  additionalInfo?: boolean;
  colorText?: string;
  endAdornment?: React.ReactNode;
  inputProperties?: OutlinedInputProps;
  toggleAction?: () => void;
}

/**
 * DatePicker input
 *
 * @typeParam disableClearable (Optional): boolean;
 * @typeParam options: {
 *
 * value: string
 *
 * text: string
 *
 * }[]
 */
export interface InputOptionsProps extends FormMUIProps {
  options: { value: string; text: string }[];
  disableClearable?: boolean;
}

/**
 * Checkbox input
 *
 * @typeParam onClick (Optional): () => void
 * @typeParam checked (Optional): boolean
 * @typeParam disabled (Optional): boolean
 * @typeParam labelHandle (Optional): boolean | string
 * @typeParam sx (Optional): SxProps
 * @typeParam mtError (Optional): number
 */
export interface InputCheckProps extends FormMUIProps {
  onClick?: () => void;
  checked?: boolean;
  disabled?: boolean;
  labelHandle?: React.ReactNode | string;
  sx?: SxProps;
  mtError?: number;
}

/**
 * DatePicker input
 *
 * @typeParam views (Optional): DateView[]
 * @typeParam format (Optional): string
 */
export interface InputDatePickerProps extends FormMUIProps {
  views?: DateView[];
  format?: string;
  datePickerProps?: DesktopDatePickerProps<Dayjs>;
}

/**
 * Props for an individual checkbox option within the InputCheckGroup component
 *
 * @property value: string;
 * @property text: string;
 */
export interface InputCheckGroupOptionProps {
  value: string;
  text: string;
}

/**
 * Props for the InputCheckGroup component
 *
 * @property name - The name of the input group
 * @property label (Optional) - The label for the input group
 * @property options - The options for the input group
 * @property onChange (Optional) - Function to handle change events
 * @property defaultValue (Optional) - The default value for the input group
 * @property control (Optional) - The control object for react-hook-form
 * @property error (Optional) - The error object for react-hook-form
 * @property labelError (Optional) - The error label for the input group
 */
export interface InputCheckGroupOptionsProps {
  name: string;
  label?: string;
  options: InputCheckGroupOptionProps[];
  onChange?: (option: InputCheckGroupOptionProps) => void;
  defaultValue?: string;
  control?: Control;
  error?: FieldErrors;
  labelError?: string;
}

/**
 * OTP input properties
 *
 * @property length - The length of the OTP code
 * @property handleResendOTP (Optional) - Function to handle resending the OTP
 * @property timeLeft - The time left for the OTP to expire
 * @property setTime - Function to set the remaining time
 */
export interface InputOTPProps extends FormMUIProps {
  length: number;
  handleResendOTP?: () => void;
  timeLeft: number;
  setTime: (a: number) => void;
}
