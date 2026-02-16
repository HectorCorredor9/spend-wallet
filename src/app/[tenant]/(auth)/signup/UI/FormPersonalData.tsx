'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowLeft from '@mui/icons-material/KeyboardBackspace';
import { Box, Typography, Button, Divider, Stack, Link as LinkMui } from '@mui/material';
//Internal app
import { getSchema } from '@/utils/tools';
import { useTenantStore, useStepperStore } from '@/store';
import { InputText, InputSelect, InputDatePicker } from '@/components';

export default function FormPersonalData() {
  const t = useTranslations();

  const { tenant, tenantUri } = useTenantStore((state) => state.tenantSett);
  const nextStep = useStepperStore((state) => state.nextStep);

  const schema = getSchema(
    ['firstName', 'middleName', 'lastName', 'surName', 'idType', 'idNumber', 'birthDate', 'gender'],
    tenant,
  );

  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      surName: '',
      idType: '',
      idNumber: '',
      birthDate: null,
      gender: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log('Personal Data submitted:', data);
    nextStep();
  };

  return (
    <>
      <Typography variant="body1" gutterBottom>
        {t('signup.personalData.title')}
      </Typography>

      <Divider sx={{ width: '100%', mb: 3 }} />

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 1, alignItems: 'center' }}>
          <InputText label={t('signup.personalData.firstName')} name="firstName" control={control} />
          <InputText label={t('signup.personalData.middleName')} name="middleName" control={control} />
          <InputText label={t('signup.personalData.lastName')} name="lastName" control={control} />
          <InputText label={t('signup.personalData.surName')} name="surName" control={control} />
          <InputSelect
            label={t('signup.personalData.idType')}
            name="idType"
            control={control}
            options={[
              { value: 'dni', text: t('signup.personalData.idTypeOptions.dni') },
              { value: 'passport', text: t('signup.personalData.idTypeOptions.passport') },
              { value: 'other', text: t('common.other') },
            ]}
          />
          <InputText label={t('signup.personalData.idNumber')} name="idNumber" control={control} />
          <InputDatePicker label={t('signup.personalData.birthDate')} name="birthDate" control={control} />
          <InputSelect
            label={t('signup.personalData.gender')}
            name="gender"
            control={control}
            options={[
              { value: 'male', text: t('signup.personalData.genderOptions.male') },
              { value: 'female', text: t('signup.personalData.genderOptions.female') },
              { value: 'other', text: t('common.other') },
            ]}
          />
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
            <Button variant="contained" type="submit" sx={{ mb: 3 }}>
              {t('common.continue')}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
