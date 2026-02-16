'use client';

import 'dayjs/locale/en';
import 'dayjs/locale/es';
import dayjs from 'dayjs';
import { useTheme } from '@mui/material/styles';
import { Box, FormHelperText } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { Controller, FieldErrors } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//Internal App
import { InputDatePickerProps } from '@/interfaces';

function DatePickerMUI(props: Readonly<InputDatePickerProps>) {
  const { name, label, labelError, error, onChange, value, views, format, datePickerProps } = props;
  const theme = useTheme();
  const t = useTranslations();
  const currentLang = useLocale();
  const textLabel = label ?? t(`${name}`);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={currentLang}>
      <DatePicker
        slotProps={{
          textField: {
            error: !!error,
          },
        }}
        label={textLabel}
        value={
          value &&
          (typeof value === 'string' || typeof value === 'number' || value instanceof Date || dayjs.isDayjs(value))
            ? dayjs(value)
            : null
        }
        onChange={onChange}
        views={views}
        format={format ?? 'DD/MM/YYYY'}
        sx={{ width: '100%' }}
        {...datePickerProps}
      />
      <FormHelperText sx={{ color: theme.palette.error.main, height: '20px', pl: 2 }} id={`${label}-helperText`}>
        {error ? t(`validation.${error.message}`) : labelError || ''}
      </FormHelperText>
    </LocalizationProvider>
  );
}

export default function InputDatePicker(props: Readonly<InputDatePickerProps>) {
  const { name, control, onChange, datePickerProps, ...restProps } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Box sx={{ width: '100%' }}>
              <DatePickerMUI
                name={name}
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                  if (onChange) onChange(e);
                }}
                datePickerProps={datePickerProps}
                error={error as unknown as FieldErrors}
                {...restProps}
              />
            </Box>
          )}
        />
      ) : (
        <DatePickerMUI name={name} onChange={onChange} datePickerProps={datePickerProps} {...restProps} />
      )}
    </>
  );
}
