'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowLeft from '@mui/icons-material/KeyboardBackspace';
import { Box, Typography, Button, Divider, Stack, Link as LinkMui } from '@mui/material';
//Internal app
import { getSchema } from '@/utils/tools';
import { InputText, InputSelect } from '@/components';
import { useTenantStore, useStepperStore } from '@/store';

export default function FormAdditionalData() {
  const t = useTranslations();

  const nextStep = useStepperStore((state) => state.nextStep);
  const prevStep = useStepperStore((state) => state.prevStep);
  const { tenant, tenantUri } = useTenantStore((state) => state.tenantSett);

  const schema = getSchema(
    [
      'nationality',
      'birthPlace',
      'civilStatus',
      'verifierCode',
      'postalCode',
      'employed',
      'laborOld',
      'profession',
      'position',
      'averageIncome',
      'publicOfficeOld',
      'publicInst',
      'taxesObligated',
    ],
    tenant,
  );

  const { control, handleSubmit } = useForm({
    defaultValues: {
      nationality: '',
      birthPlace: '',
      civilStatus: '',
      verifierCode: '',
      postalCode: '',
      employed: '',
      laborOld: '',
      profession: '',
      position: '',
      averageIncome: '',
      publicOfficeOld: '',
      publicInst: '',
      taxesObligated: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmitAdditionalData = (data: any) => {
    console.log('Additional Data submitted:', data);
    nextStep();
  };

  return (
    <>
      <Typography variant="body1" gutterBottom>
        {t('signup.additionalData.title')}
      </Typography>

      <Divider sx={{ width: '100%', mb: 3 }} />

      <Box component="form" onSubmit={handleSubmit(onSubmitAdditionalData)}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 1, alignItems: 'center' }}>
          <InputText label={t('signup.additionalData.nationality')} name="nationality" control={control} />
          <InputText label={t('signup.additionalData.birthPlace')} name="birthPlace" control={control} />
          <InputSelect
            label={t('signup.additionalData.civilStatus')}
            name="civilStatus"
            control={control}
            options={[
              { value: 'single', text: t('signup.additionalData.civilStatusOptions.single') },
              { value: 'married', text: t('signup.additionalData.civilStatusOptions.married') },
              { value: 'divorced', text: t('signup.additionalData.civilStatusOptions.divorced') },
              { value: 'widowed', text: t('signup.additionalData.civilStatusOptions.widowed') },
              { value: 'other', text: t('common.other') },
            ]}
          />
          <InputText label={t('signup.additionalData.verifierCode')} name="verifierCode" control={control} />
          <InputText label={t('signup.additionalData.postalCode')} name="postalCode" control={control} />
          <InputSelect
            label={t('signup.additionalData.employed')}
            name="employed"
            control={control}
            options={[
              { value: 'employed', text: t('signup.additionalData.employedOptions.employed') },
              { value: 'unemployed', text: t('signup.additionalData.employedOptions.unemployed') },
              { value: 'self-employed', text: t('signup.additionalData.employedOptions.selfEmployed') },
              { value: 'retired', text: t('signup.additionalData.employedOptions.retired') },
              { value: 'other', text: t('common.other') },
            ]}
          />
          <InputText label={t('signup.additionalData.laborOld')} name="laborOld" control={control} />
          <InputText label={t('signup.additionalData.profession')} name="profession" control={control} />
          <InputText label={t('signup.additionalData.position')} name="position" control={control} />
          <InputText label={t('signup.additionalData.averageIncome')} name="averageIncome" control={control} />
          <InputSelect
            label={t('signup.additionalData.publicOfficeOld')}
            name="publicOfficeOld"
            control={control}
            options={[
              { value: 'true', text: t('signup.additionalData.yesNo.yes') },
              { value: 'false', text: t('signup.additionalData.yesNo.no') },
            ]}
          />
          <InputText label={t('signup.additionalData.publicInst')} name="publicInst" control={control} />
          <InputSelect
            label={t('signup.additionalData.taxesObligated')}
            name="taxesObligated"
            control={control}
            options={[
              { value: 'true', text: t('signup.additionalData.yesNo.yes') },
              { value: 'false', text: t('signup.additionalData.yesNo.no') },
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
