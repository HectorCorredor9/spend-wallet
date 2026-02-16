'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import KeyIcon from '@mui/icons-material/Key';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowLeft from '@mui/icons-material/KeyboardBackspace';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Button, InputAdornment, Link as LinkMui, List, ListItem, ListItemIcon, Typography } from '@mui/material';
//Internal app
import { useTenantStore } from '@/store';
import { InputPass } from '@/components';
import { getSchema } from '@/utils/tools';

export default function FormChangePassword() {
  const t = useTranslations();
  const { push } = useRouter();

  const { tenant, tenantUri } = useTenantStore((state) => state.tenantSett);

  const schema = getSchema(['currentPassword', 'newPassword', 'currentNewPassword'], tenant);

  const { handleSubmit, control } = useForm({
    defaultValues: { currentPassword: '', newPassword: '', currentNewPassword: '' },
    resolver: yupResolver(schema),
  });

  const onSubmitNewPassword = () => {
    console.log('New password submitted');
    push(`/${tenantUri}/dashboard/profile`);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitNewPassword)}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}
    >
      <InputPass
        label={t('security.form.currentPassword')}
        name="currentPassword"
        control={control}
        startAdornment={
          <InputAdornment position="start">
            <KeyIcon />
          </InputAdornment>
        }
      />

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

      <Box sx={{ bgcolor: 'primary.light', borderRadius: 1, p: 2, mb: 3 }}>
        <Typography variant="subtitle2" fontWeight={600} mb={1}>
          {t('security.requirements.title')}
        </Typography>
        <List dense disablePadding>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 28 }}>
              <CheckCircleOutlineIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2" color="text.secondary">
              {t('security.requirements.1')}
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 28 }}>
              <CheckCircleOutlineIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2" color="text.secondary">
              {t('security.requirements.2')}
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 28 }}>
              <CheckCircleOutlineIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2" color="text.secondary">
              {t('security.requirements.3')}
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 28 }}>
              <CheckCircleOutlineIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2" color="text.secondary">
              {t('security.requirements.4')}
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Button variant="contained" type="submit" fullWidth>
        {t('common.update')}
      </Button>

      <LinkMui
        component={Link}
        href={`/${tenantUri}/dashboard/profile`}
        sx={{ color: 'primary.main', textDecoration: 'none', display: 'flex', alignItems: 'center', mt: 2, gap: 1 }}
      >
        <ArrowLeft fontSize="small" /> {t('common.back')}
      </LinkMui>
    </Box>
  );
}
