'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import KeyIcon from '@mui/icons-material/Key';
import ReplayIcon from '@mui/icons-material/Replay';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowLeft from '@mui/icons-material/KeyboardBackspace';
import { Box, Button, Typography, InputAdornment, IconButton, Tooltip, Link as LinkMui } from '@mui/material';
// Internal App Imports
import { getSchema } from '@/utils/tools';
import { InputText, InputCheck } from '@/components';
import { useTenantStore, useUiStore } from '@/store';

export default function FormMfa() {
  const t = useTranslations();
  const { push } = useRouter();

  const setPopperError = useUiStore((state) => state.setPopperError);
  const { tenant, tenantUri } = useTenantStore((state) => state.tenantSett);

  const [counter, setCounter] = useState(60);

  const schema = getSchema(['confirmationCode'], tenant);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  const { handleSubmit, control } = useForm({
    defaultValues: { confirmationCode: '', trustDevice: false },
    resolver: yupResolver(schema),
  });

  /**
   * Redirects to sign-in page.
   * Cognito does not allow resending MFA codes without credentials for security reasons.
   */
  const handleResend = () => {
    setPopperError({
      title: t('mfa.resend'),
      description: t('mfa.resendRequiresLogin'),
    });
  };

  const onSubmitFormMfa = async () => {
    console.log('Submitting MFA code');
    push(`/${tenantUri}/dashboard`);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitFormMfa)}
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
              <IconButton onClick={handleResend}>
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

      <InputCheck name="trustDevice" label={t('mfa.trustDeviceLabel')} control={control} />

      <Button variant="contained" type="submit" fullWidth>
        {t('mfa.continue')}
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
