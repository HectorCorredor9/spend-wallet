'use client';

import { useTranslations } from 'next-intl';
import { Controller, FieldErrors } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@mui/material';
//Internal App
import { InputOptionsProps } from '@/interfaces';

function SelectMUI(props: Readonly<InputOptionsProps>) {
  const { name, label, options, labelError, error, value, onChange, startAdornment } = props;
  const t = useTranslations();
  const textLabel = label ?? t(`${name}`);

  return (
    <FormControl error={!!error} variant="outlined" sx={{ mb: '5px' }} fullWidth>
      <InputLabel id={name}>{textLabel}</InputLabel>
      <Select labelId={name} value={value ?? ''} label={textLabel} onChange={onChange} startAdornment={startAdornment}>
        {options.map((option: InputOptionsProps['options'][number]) => (
          <MenuItem value={option.value} key={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText sx={{ height: '20px' }}>
        {error ? t(`validation.${error.message}`) : labelError || ''}
      </FormHelperText>
    </FormControl>
  );
}

export default function InputSelect(props: Readonly<InputOptionsProps>) {
  const { name, control, onChange, options, ...restProps } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <SelectMUI
              name={name}
              value={field.value}
              options={options}
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
        <SelectMUI name={name} onChange={onChange} options={options} {...restProps} />
      )}
    </>
  );
}
