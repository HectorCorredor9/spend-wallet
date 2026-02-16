'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material/styles';
import { Controller, FieldErrors } from 'react-hook-form';
import { FormControl, FormHelperText, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
//Internal App
import { InputCheckProps } from '@/interfaces';

function InputCheckMUI(props: Readonly<InputCheckProps>) {
  const { name, label, labelError, onChange, onClick, checked, value, error, disabled } = props;
  const theme = useTheme();
  const t = useTranslations();

  return (
    <FormControl component="fieldset" variant="standard" fullWidth>
      <FormGroup onClick={onClick}>
        <FormControlLabel
          value={value}
          disabled={disabled}
          checked
          control={<Checkbox id={name} checked={checked} onChange={onChange} />}
          label={label}
          sx={{ mb: 0, mr: 0 }}
        />
      </FormGroup>
      <FormHelperText sx={{ color: theme.palette.error.main, height: '20px' }} id={`${label}-helperText`}>
        {error ? t(`validation.${error.message}`) : labelError || ''}
      </FormHelperText>
    </FormControl>
  );
}

export default function InputCheck(props: Readonly<InputCheckProps>) {
  const { name, control, onChange, onClick, ...restProps } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputCheckMUI
              name={name}
              value={field.value}
              onClick={onClick}
              checked={!!field.value}
              onChange={(e) => {
                field.onChange(e);
                if (onChange) onChange(e);
              }}
              error={error as unknown as FieldErrors}
              {...restProps}
            />
          )}
        />
      ) : (
        <InputCheckMUI name={name} onChange={onChange} onClick={onClick} {...restProps} />
      )}
    </>
  );
}
