'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput, IconButton } from '@mui/material';
//Internal App
import { TextFieldProps } from '@/interfaces';

/**
 * Field used to display or not display a password.
 *
 * @param name - Name of the field - React Hook Form.
 * @param control - Object provided by the useForm method - React Hook Form.
 * @param label - The label of the input.
 * @param labelError - Text for error message.
 * @param onChange - Detect the change in the input.
 * @param disabled - Disable input.
 * @param readOnly - Make the input read-only.
 * @returns The value assigned to the input.
 * @throws If there is an error in any field that does not comply with the regular expressions.
 * @label React Hook Form - {@link https://react-hook-form.com/docs/useform/control}
 * @label Material UI - {@link https://mui.com/material-ui/api/all/outlined-input/}
 */
export default function InputPass(props: Readonly<TextFieldProps>) {
  const { name, label, labelError, onChange, control, disabled, readOnly, startAdornment } = props;
  const t = useTranslations();
  const textLabel = label ?? t(`${name}`);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth variant="outlined" error={!!error} sx={{ mb: '5px' }}>
          <InputLabel htmlFor={name}>{textLabel}</InputLabel>
          <OutlinedInput
            id={name}
            type={passwordShown ? 'text' : 'password'}
            label={textLabel}
            aria-describedby={`${name}-helperText`}
            value={field.value}
            disabled={disabled}
            readOnly={readOnly}
            onChange={(e) => {
              field.onChange(e);
              if (onChange) onChange(e);
            }}
            error={!!error}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={togglePasswordVisiblity} edge="end">
                  {passwordShown ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            startAdornment={startAdornment}
          />
          <FormHelperText sx={{ height: '20px' }} id={`${name}-helperText`}>
            {error ? t(`validation.${error.message}`) : labelError || ''}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
