'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Controller, FieldErrors } from 'react-hook-form';
import { Checkbox, FormControlLabel, FormGroup, Typography, FormHelperText, FormControl } from '@mui/material';
// Internal app
import { InputCheckGroupOptionProps, InputCheckGroupOptionsProps } from '@/interfaces';

function CheckGroupControl(
  props: InputCheckGroupOptionsProps & {
    selectedValue: string;
    handleCheckboxChange: (option: InputCheckGroupOptionProps) => void;
  }
) {
  const { label, options, selectedValue, handleCheckboxChange, error, labelError } = props;
  const t = useTranslations();

  return (
    <FormControl component="fieldset" error={!!error} fullWidth sx={{ mb: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        {t(`${label}`)}:
      </Typography>
      <FormGroup sx={{ gap: 0 }}>
        {options.map((option: InputCheckGroupOptionProps) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox checked={selectedValue === option.value} onChange={() => handleCheckboxChange(option)} />
            }
            label={option.text}
            sx={{ alignItems: 'center', '&>.MuiFormControlLabel-label': { fontSize: 14 }, mr: 0 }}
          />
        ))}
      </FormGroup>
      <FormHelperText>{error ? t(`validation.${error.message}`) : labelError ?? ''}</FormHelperText>
    </FormControl>
  );
}

export default function InputCheckGroup(props: Readonly<InputCheckGroupOptionsProps>) {
  const { name, label, control, options, defaultValue, onChange, ...restProps } = props;

  const [selectedValue, setSelectedValue] = useState(defaultValue ?? '');

  const handleCheckboxChange = (option: InputCheckGroupOptionProps) => {
    if (onChange) onChange(option);
    setSelectedValue(selectedValue === option.value ? '' : option.value);
  };

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CheckGroupControl
              name={name}
              label={label}
              options={options}
              selectedValue={field.value || selectedValue}
              handleCheckboxChange={(option) => {
                field.onChange(option.value);
                handleCheckboxChange(option);
              }}
              error={error as unknown as FieldErrors}
              {...restProps}
            />
          )}
        />
      ) : (
        <CheckGroupControl
          name={name}
          options={options}
          selectedValue={selectedValue}
          handleCheckboxChange={handleCheckboxChange}
          {...restProps}
        />
      )}
    </>
  );
}
