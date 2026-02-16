'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import KeyIcon from '@mui/icons-material/Key';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowLeft from '@mui/icons-material/KeyboardBackspace';
import { Box, InputAdornment, Button, Link as LinkMui } from '@mui/material';
//Internal app
import { InputPass } from '@/components';
import { getSchema } from '@/utils/tools';
import { useTenantStore, useUiStore } from '@/store';

export default function FormUpdatePassword() {
  const t = useTranslations();
  const { push } = useRouter();

  const loadingScreen = useUiStore((state) => state.loadingScreen);
  const { tenant, tenantUri } = useTenantStore((state) => state.tenantSett);

  const schema = getSchema(['newPassword', 'currentNewPassword'], tenant);

  const { control, handleSubmit } = useForm({
    defaultValues: { newPassword: '', currentNewPassword: '' },
    resolver: yupResolver(schema),
  });

  const onSubmitUpdatePassword = () => {
    console.log('Update password form submitted');
    push(`/${tenantUri}/dashboard`);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitUpdatePassword)}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}
    >
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

      <Button variant="contained" type="submit" fullWidth disabled={loadingScreen}>
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
