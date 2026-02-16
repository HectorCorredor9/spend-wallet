'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import PersonIcon from '@mui/icons-material/Person';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowLeft from '@mui/icons-material/KeyboardBackspace';
import { Box, Button, InputAdornment, Link as LinkMui } from '@mui/material';
//Internal app
import { InputText } from '@/components';
import { useTenantStore } from '@/store';
import { getSchema } from '@/utils/tools';

export default function FormIdentify() {
  const t = useTranslations();
  const { push } = useRouter();

  const { tenant, tenantUri } = useTenantStore((state) => state.tenantSett);

  const schema = getSchema(['email'], tenant);

  const { control, handleSubmit } = useForm({
    defaultValues: { email: '' },
    resolver: yupResolver(schema),
  });

  const onSubmitRequestCode = () => {
    console.log('Request code submitted');
    push(`/${tenantUri}/recover-password/new-password`);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitRequestCode)}
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

      <Button variant="contained" type="submit" fullWidth>
        {t('common.continue')}
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
