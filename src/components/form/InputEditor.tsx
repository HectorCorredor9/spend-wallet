'use client';

import { useTranslations } from 'next-intl';
import Edit from '@mui/icons-material/EditOutlined';
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
export default function InputEditor(props: Readonly<TextFieldProps>) {
  const { name, label, labelError, type, value, disabled, readOnly, startAdornment, toggleAction } = props;
  const t = useTranslations();
  const textLabel = label ?? t(`${name}`);

  return (
    <FormControl fullWidth variant="outlined" sx={{ mb: '5px' }}>
      <InputLabel htmlFor={name}>{textLabel}</InputLabel>
      <OutlinedInput
        id={name}
        className="input-action"
        type={type ?? 'text'}
        label={textLabel}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        startAdornment={startAdornment}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle edit" onClick={toggleAction} edge="end" disabled={disabled}>
              <Edit />
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText sx={{ height: '20px' }}>
        {labelError || ''} {/* Puedes mostrar errores o mensajes adicionales */}
      </FormHelperText>
    </FormControl>
  );
}
