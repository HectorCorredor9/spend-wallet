'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Button, Divider, Stack } from '@mui/material';
//Internal app
import { InputText } from '@/components';
import { getSchema } from '@/utils/tools';
import { useTenantStore, useStepperStore } from '@/store';

export default function FormContactInformation() {
  const t = useTranslations();

  const nextStep = useStepperStore((state) => state.nextStep);
  const prevStep = useStepperStore((state) => state.prevStep);
  const { tenant } = useTenantStore((state) => state.tenantSett);

  const schema = getSchema(['email', 'phoneNumber', 'state', 'city', 'district', 'address'], tenant);

  const { control, handleSubmit } = useForm({
    defaultValues: { email: '', phoneNumber: '', state: '', city: '', district: '', address: '' },
    resolver: yupResolver(schema),
  });

  const onSubmitContactInformation = (data: any) => {
    console.log('Contact Information submitted:', data);
    nextStep();
  };

  return (
    <>
      <Typography variant="body1" gutterBottom>
        {t('signup.contactInformation.title')}
      </Typography>

      <Divider sx={{ width: '100%', mb: 3 }} />

      <Box component="form" onSubmit={handleSubmit(onSubmitContactInformation)}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 1, alignItems: 'center' }}>
          <InputText label={t('signup.contactInformation.email')} name="email" control={control} />
          <InputText label={t('signup.contactInformation.phoneNumber')} name="phoneNumber" control={control} />
          <InputText label={t('signup.contactInformation.state')} name="state" control={control} />
          <InputText label={t('signup.contactInformation.city')} name="city" control={control} />
          <InputText label={t('signup.contactInformation.district')} name="district" control={control} />
          <InputText label={t('signup.contactInformation.address')} name="address" control={control} />
        </Box>

        <Stack direction="row" justifyContent="space-end" spacing={2}>
          <Button variant="outlined" onClick={prevStep}>
            {t('common.back')}
          </Button>
          <Button variant="contained" type="submit" sx={{ mb: 3 }}>
            {t('common.continue')}
          </Button>
        </Stack>
      </Box>
    </>
  );
}
