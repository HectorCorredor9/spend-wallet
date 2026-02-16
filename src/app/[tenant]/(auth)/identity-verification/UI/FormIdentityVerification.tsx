'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LockIcon from '@mui/icons-material/Lock';
import BadgeIcon from '@mui/icons-material/Badge';
import { yupResolver } from '@hookform/resolvers/yup';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Box, Button, InputAdornment } from '@mui/material';
//Internal app
import { useTenantStore } from '@/store';
import { getSchema } from '@/utils/tools';
import { CardFormData } from '@/interfaces';
import { InputText, InputPass } from '@/components';

export default function FormIdentityVerification() {
  const t = useTranslations();
  const { push } = useRouter();
  const { tenant, tenantUri } = useTenantStore((state) => state.tenantSett);

  const schema = getSchema(['dni', 'cardNumber', 'pin'], tenant);

  const { control, handleSubmit } = useForm<CardFormData>({
    defaultValues: { dni: '', cardNumber: '', pin: '' },
    resolver: yupResolver(schema),
  });

  const onSubmitForm = (data: CardFormData) => {
    console.info('Identity verification form submitted:', data);
    push(`/${tenantUri}/signup`);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitForm)}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}
    >
      <InputText
        label={t('common.dni')}
        name="dni"
        control={control}
        type="text"
        startAdornment={
          <InputAdornment position="start">
            <BadgeIcon />
          </InputAdornment>
        }
      />
      <InputText
        label={t('common.cardNumber')}
        name="cardNumber"
        control={control}
        type="text"
        startAdornment={
          <InputAdornment position="start">
            <CreditCardIcon />
          </InputAdornment>
        }
      />
      <InputPass
        label={t('common.pin')}
        name="pin"
        control={control}
        startAdornment={
          <InputAdornment position="start">
            <LockIcon />
          </InputAdornment>
        }
      />
      <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
        {t('identityVerification.verify')}
      </Button>
    </Box>
  );
}
