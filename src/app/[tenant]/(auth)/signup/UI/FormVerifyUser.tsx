'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, InputAdornment, Typography, Link as LinkMui, Button } from '@mui/material';
//Internal app
import { useTenantStore } from '@/store';
import { getSchema } from '@/utils/tools';
import { InputText, InputPass } from '@/components';

export default function FormVerifyUser() {
  const t = useTranslations();
  const { push } = useRouter();

  const { tenant, tenantUri } = useTenantStore((state) => state.tenantSett);

  const schema = getSchema(['email', 'password'], tenant);

  const { control, handleSubmit } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });

  const onSubmitVerifyUser = () => {
    console.log('Verify user form submitted');
    push(`/${tenantUri}/signin/mfa`);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitVerifyUser)}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}
    >
      <InputText
        label={t('common.email')}
        name="email"
        control={control}
        startAdornment={
          <InputAdornment position="start">
            <PersonIcon />
          </InputAdornment>
        }
      />
      <InputPass
        label={t('common.password')}
        name="password"
        control={control}
        startAdornment={
          <InputAdornment position="start">
            <KeyIcon />
          </InputAdornment>
        }
      />
      <Box width="100%" textAlign="end" mb={3}>
        <LinkMui
          component={Link}
          href={`/${tenantUri}/recover-password/indentify`}
          sx={{ p: 0, height: 'auto', color: 'primary.main', textDecoration: 'none' }}
        >
          {t('signin.forgotPassword')}
        </LinkMui>
      </Box>
      <Button variant="contained" type="submit" fullWidth sx={{ mb: 3 }}>
        {t('signin.signIn')}
      </Button>
      <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {t('signin.newUser')}{' '}
        <LinkMui
          component={Link}
          href={`/${tenantUri}/signup`}
          sx={{ height: 'auto', minWidth: 0, pl: 1, py: 0, color: 'primary.main', textDecoration: 'none' }}
        >
          {t('signin.signUp')}
        </LinkMui>
      </Typography>
    </Box>
  );
}
