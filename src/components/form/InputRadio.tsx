'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from '@mui/material/styles';
import { Controller, FieldErrors } from 'react-hook-form';
import { FormControl, FormLabel, FormHelperText, Radio, FormControlLabel, RadioGroup } from '@mui/material';
//Internal App
import { InputOptionsProps } from '@/interfaces';

function InputRadioMUI(props: Readonly<InputOptionsProps>) {
  const { name, label, labelError, error, value, onChange, options } = props;
  const theme = useTheme();
  const t = useTranslations();

  return (
    <FormControl component="fieldset" variant="standard" fullWidth>
      {label && <FormLabel focused={false}>{label}</FormLabel>}
      <RadioGroup name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio id={name + option.value} />}
            label={option.text}
            labelPlacement="start"
            sx={{ m: 0, justifyContent: 'space-between', width: '100%' }}
          />
        ))}
      </RadioGroup>
      <FormHelperText sx={{ color: theme.palette.error.main, height: '20px' }} id={`${label}-helperText`}>
        {error ? t(`validation.${error.message}`) : labelError || ''}
      </FormHelperText>
    </FormControl>
  );
}

export default function InputRadio(props: Readonly<InputOptionsProps>) {
  const { name, control, onChange, options, ...restProps } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputRadioMUI
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
        <InputRadioMUI name={name} onChange={onChange} options={options} />
      )}
    </>
  );
}
