'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowLeft from '@mui/icons-material/KeyboardBackspace';
import { Box, Typography, Button, Divider, Stack, Link as LinkMui } from '@mui/material';
//Internal app
import { getSchema } from '@/utils/tools';
import { InputText } from '@/components';
import { useTenantStore, useStepperStore } from '@/store';

export default function FormCreatePassword() {
  const t = useTranslations();
  const router = useRouter();

  const { tenant, tenantUri } = useTenantStore((state) => state.tenantSett);
  const prevStep = useStepperStore((state) => state.prevStep);

  const schema = getSchema(['nickName', 'newPass', 'confirmPass'], tenant);

  const { control, handleSubmit } = useForm({
    defaultValues: { nickName: '', newPass: '', confirmPass: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log('Create Password submitted:', data);
    router.push(`/${tenantUri}/signin`);
  };

  return (
    <>
      <Typography variant="body1" gutterBottom>
        {t('signup.createPassword.title')}
      </Typography>

      <Divider sx={{ width: '100%', mb: 3 }} />

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 1, alignItems: 'center' }}>
          <InputText label={t('signup.createPassword.nickName')} name="nickName" control={control} />
          <InputText label={t('signup.createPassword.newPass')} name="newPass" control={control} />
          <InputText label={t('signup.createPassword.confirmPass')} name="confirmPass" control={control} />
        </Box>

        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <LinkMui
            component={Link}
            href={`/${tenantUri}/signin`}
            sx={{ color: 'primary.main', textDecoration: 'none', display: 'flex', alignItems: 'center', mt: 2, gap: 1 }}
          >
            <ArrowLeft fontSize="small" /> {t('common.goToSignin')}
          </LinkMui>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={prevStep}>
              {t('common.back')}
            </Button>
            <Button variant="contained" type="submit" sx={{ mb: 3 }}>
              {t('common.continue')}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
