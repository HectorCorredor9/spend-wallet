'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import KeyIcon from '@mui/icons-material/Key';
import ReplayIcon from '@mui/icons-material/Replay';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowLeft from '@mui/icons-material/KeyboardBackspace';
import { Box, Button, IconButton, InputAdornment, Link as LinkMui, Tooltip, Typography } from '@mui/material';
//Internal app
import { getSchema } from '@/utils/tools';
import { useSessionControl } from '@/hooks';
import { InputText, InputPass } from '@/components';
import { useUiStore, useTenantStore } from '@/store';

export default function FormNewPassword() {
  useSessionControl();
  const t = useTranslations();
  const { push } = useRouter();

  const setPopperSuccess = useUiStore((state) => state.setPopperSuccess);
  const { tenant, tenantUri } = useTenantStore((state) => state.tenantSett);

  const schema = getSchema(['confirmationCode', 'newPassword', 'currentNewPassword'], tenant);

  const [counter, setCounter] = useState(60);

  const { handleSubmit, control } = useForm({
    defaultValues: { confirmationCode: '', newPassword: '', currentNewPassword: '' },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  const onSubmitNewPassword = () => {
    console.log('New password submitted');
    push(`/${tenantUri}/signin`);
  };

  /**
   * Handles the resend code request using the shared useRequestCode hook.
   *
   * This function is triggered when the user clicks the resend code button.
   * It uses the shared hook to send a request to get a new OTP code.
   */
  const handleResendCode = () => {
    setPopperSuccess({ title: t('messages.resendCodeSuccess') });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitNewPassword)}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}
    >
      <InputText
        label={t('common.confirmationCode')}
        name="confirmationCode"
        control={control}
        endAdornment={
          counter > 0 ? (
            <Typography>{counter}</Typography>
          ) : (
            <Tooltip title={t('common.resendCode')} placement="top">
              <IconButton onClick={handleResendCode}>
                <ReplayIcon sx={{ color: 'primary.main' }} />
              </IconButton>
            </Tooltip>
          )
        }
        startAdornment={
          <InputAdornment position="start">
            <KeyIcon />
          </InputAdornment>
        }
      />

      <InputPass
        label={t('common.newPassword')}
        name="newPassword"
        control={control}
        startAdornment={
          <InputAdornment position="start">
            <KeyIcon />
          </InputAdornment>
        }
      />
      <InputPass
        label={t('common.currentNewPassword')}
        name="currentNewPassword"
        control={control}
        startAdornment={
          <InputAdornment position="start">
            <KeyIcon />
          </InputAdornment>
        }
      />

      <Button variant="contained" type="submit" fullWidth>
        {t('common.update')}
      </Button>

      <LinkMui
        component={Link}
        href={`/${tenantUri}/signin`}
        sx={{ color: 'primary.main', textDecoration: 'none', display: 'flex', alignItems: 'center', mt: 2, gap: 1 }}
      >
        <ArrowLeft fontSize="small" /> {t('common.goToSignin')}
      </LinkMui>
    </Box>
  );
}
