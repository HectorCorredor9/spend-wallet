'use client';

import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
import { Box, Button, FormHelperText, useTheme, Typography } from '@mui/material';
//Internal app
import { formatTime } from '@/utils/tools';
import { InputOTPProps } from '@/interfaces';

/**
 * Field used to enter an OTP code.
 *
 * @param props - The properties for the InputOTP component.
 * @param props.name - Name of the field - React Hook Form.
 * @param props.control - Object provided by the useForm method - React Hook Form.
 * @param props.length - Number of OTP fields.
 * @param props.labelError - Text for error message.
 * @param props.handleResendOTP - Function to handle resending the OTP.
 * @param props.timeLeft - Time left for the OTP to expire.
 * @param props.setTime - Function to set the time left for the OTP.
 * @returns The value assigned to the OTP.
 * @throws If there is an error in any field that does not comply with the regular expressions.
 * @label React Hook Form - {@link https://react-hook-form.com/docs/useform/control}
 * @label MUI Otp input - {@link https://www.npmjs.com/package/react-otp-input}
 */
export default function InputOTP(props: Readonly<InputOTPProps>) {
  const { control, name, length, labelError, handleResendOTP, timeLeft, setTime } = props;
  const t = useTranslations();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleResend = () => {
    if (handleResendOTP) {
      handleResendOTP();
    }
    setTime(60);
    setOpen(!open);
  };

  return (
    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Controller
        name={name}
        control={control}
        rules={{ validate: (value: any) => value.length === length }}
        render={({ field, fieldState: { error } }) => (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <OtpInput
              value={field.value}
              onChange={(otp) => field.onChange(otp)}
              numInputs={length}
              containerStyle={{ display: 'flex', justifyContent: 'center', gap: 8, width: '100%' }}
              inputStyle={{
                width: '40px',
                height: '56px',
                fontSize: theme.typography.h4.fontSize,
                borderRadius: theme.shape.borderRadius,
                border: 'none',
                backgroundColor: theme.palette.primary.light,
              }}
              renderInput={(props) => <input {...props} />}
            />
            <FormHelperText
              sx={{
                height: 20,
                ml: 0,
                display: 'flex',
                alignItems: 'center',
              }}
              id={`${name}-helperText`}
              error
            >
              {error ? t(`validation.${error.message}`) : labelError || ''}
            </FormHelperText>
          </Box>
        )}
      />

      <Typography variant="h6"> {t('common.getCode')}</Typography>

      <Button onClick={handleResend} sx={{ mb: 1 }} disabled={timeLeft !== 0}>
        {t('common.resendCode')}
      </Button>

      <Typography variant="h3" color="text">
        {formatTime(timeLeft)}
      </Typography>
    </Box>
  );
}
