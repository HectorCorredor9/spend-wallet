'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import { Box, Button, Dialog, DialogActions, DialogTitle, InputAdornment } from '@mui/material';
//Internal app
import { InputPass } from '@/components';
import { getSchema } from '@/utils/tools';
import { useTenantStore } from '@/store';

export default function Changepin(props: { open: boolean; onClose: () => void }) {
  const { open, onClose } = props;
  const t = useTranslations();

  const { tenant } = useTenantStore((state) => state.tenantSett);

  const schema = getSchema(['pin', 'newPin', 'currentNewPin'], tenant);

  const { control, handleSubmit } = useForm({
    defaultValues: { pin: '', newPin: '', currentNewPin: '' },
    resolver: yupResolver(schema),
  });

  const onSubmitChangePin = (data: { pin: string; newPin: string; currentNewPin: string }) => {
    console.log('Cambiar PIN', data);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('dashboard.changePin')}</DialogTitle>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmitChangePin)}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, p: '20px 24px' }}
      >
        <InputPass
          label={t('dashboard.pin')}
          name="pin"
          control={control}
          startAdornment={
            <InputAdornment position="start">
              <PasswordOutlinedIcon />
            </InputAdornment>
          }
        />
        <InputPass
          label={t('dashboard.newPin')}
          name="newPin"
          control={control}
          startAdornment={
            <InputAdornment position="start">
              <PasswordOutlinedIcon />
            </InputAdornment>
          }
        />
        <InputPass
          label={t('dashboard.currentNewPin')}
          name="currentNewPin"
          control={control}
          startAdornment={
            <InputAdornment position="start">
              <PasswordOutlinedIcon />
            </InputAdornment>
          }
        />

        <DialogActions sx={{ width: '100%', p: '0px !important' }}>
          <Button variant="text" fullWidth onClick={onClose}>
            {t('common.close')}
          </Button>
          <Button variant="contained" fullWidth type="submit">
            {t('common.update')}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
