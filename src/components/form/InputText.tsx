'use client';

import { useTranslations } from 'next-intl';
import { Controller, FieldErrors } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
//Internal app
import { TextFieldProps } from '@/interfaces';

function InputMUI(props: Readonly<TextFieldProps>) {
  const {
    name,
    label,
    labelError,
    type,
    endAdornment,
    error,
    value,
    onChange,
    startAdornment,
    multiline,
    rows,
    disabled,
  } = props;

  const t = useTranslations();
  const textLabel = label ?? t(`${name}`);

  return (
    <FormControl variant="outlined" error={!!error} sx={{ mb: '5px' }} fullWidth>
      <InputLabel htmlFor={name}>{textLabel}</InputLabel>
      <OutlinedInput
        id={name}
        type={type ?? 'text'}
        label={textLabel}
        aria-describedby={`${name}-helperText`}
        error={!!error}
        value={value ?? ''}
        onChange={onChange}
        endAdornment={endAdornment}
        startAdornment={startAdornment}
        multiline={multiline}
        rows={rows}
        disabled={disabled}
      />
      <FormHelperText sx={{ height: '20px' }} id={`${name}-helperText`}>
        {error ? t(`validation.${error.message}`) : labelError || ''}
      </FormHelperText>
    </FormControl>
  );
}

export default function InputText(props: Readonly<TextFieldProps>) {
  const { name, control, onChange, ...restProps } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputMUI
              name={name}
              value={field.value ?? ''}
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
        <InputMUI name={name} value={restProps.value} onChange={onChange} {...restProps} />
      )}
    </>
  );
}
