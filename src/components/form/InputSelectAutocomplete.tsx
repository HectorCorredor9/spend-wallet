'use client';

import React, { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { Controller, FieldErrors } from 'react-hook-form';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FormControl, FormHelperText, Autocomplete, TextField, Box } from '@mui/material';
// Internal app
import { InputOptionsProps } from '@/interfaces';

function AutocompleteMUI(props: Readonly<InputOptionsProps>): JSX.Element {
  const {
    name,
    label,
    options,
    labelError,
    error,
    value,
    onChange,
    disabled,
    readOnly,
    disableClearable,
    startAdornment,
  } = props;

  const t = useTranslations();

  return (
    <FormControl error={!!error} variant="outlined" fullWidth>
      <Autocomplete
        value={value}
        popupIcon={<ArrowForwardIosIcon sx={{ mr: 1 }} />}
        id={name}
        disableClearable={disableClearable}
        options={options}
        disabled={disabled}
        readOnly={readOnly}
        // Keep the displayed label logic
        getOptionLabel={(option) => {
          if (!option) return '';
          if (typeof option === 'object' && 'text' in option) return option.text;
          const found = options.find((o) => o.value === option);
          return found?.text ?? '';
        }}
        // Make value comparison robust
        isOptionEqualToValue={(option, val) => {
          const valValue = val && typeof val === 'object' && 'value' in val ? (val as any).value : (val as string);
          return option.value === valValue;
        }}
        // ✅ Ensure unique React keys for each <li> option
        renderOption={(renderProps, option) => (
          <li {...renderProps} key={String(option.value)}>
            {option.text}
          </li>
        )}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              startAdornment: startAdornment ? (
                <Box sx={{ ml: 2 }}>{startAdornment}</Box>
              ) : (
                params.InputProps.startAdornment
              ),
            }}
          />
        )}
      />
      <FormHelperText sx={{ height: '20px' }} id={`${name}-helperText`}>
        {error ? t(`validation.${(error as any).message}`) : labelError || ''}
      </FormHelperText>
    </FormControl>
  );
}

export default function InputSelect(props: Readonly<InputOptionsProps>): JSX.Element {
  const { name, control, onChange, options, disableClearable, startAdornment, ...restProps } = props;

  return control ? (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <AutocompleteMUI
          name={name}
          value={field.value}
          disableClearable={disableClearable}
          options={options}
          onChange={(e, data) => {
            const selectedValue =
              data && typeof data === 'object' && 'value' in data ? (data as { value: string | number }).value : data;
            field.onChange(selectedValue);
            onChange?.(e, data);
          }}
          error={error as unknown as FieldErrors}
          startAdornment={startAdornment}
          {...restProps}
        />
      )}
    />
  ) : (
    <AutocompleteMUI
      name={name}
      onChange={onChange}
      options={options}
      disableClearable={disableClearable}
      startAdornment={startAdornment}
      {...restProps}
    />
  );
}
