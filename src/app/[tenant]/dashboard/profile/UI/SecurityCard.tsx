'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Card, CardContent, Box, Stack, Typography, IconButton } from '@mui/material';
//Internal app
import { useTenantStore } from '@/store/useTenantStore';

export default function SecurityCard() {
  const t = useTranslations();
  const { push } = useRouter();

  const { tenantUri } = useTenantStore((state) => state.tenantSett);
  return (
    <Card
      sx={{
        cursor: 'pointer',
        '&:hover': { bgcolor: 'primary.light', border: '1px solid', borderColor: 'primary.main' },
      }}
      tabIndex={0}
      role="button"
      aria-label={t('profile.security.description')}
      onClick={() => {
        push(`/${tenantUri}/dashboard/profile/security`);
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            backgroundColor: 'primary.main',
            p: 1.5,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: 32, color: 'white' }} />
        </Box>
        <Stack direction="column">
          <Typography variant="h6" fontWeight={600}>
            {t('profile.security.title')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('profile.security.description')}
          </Typography>
        </Stack>
        <IconButton edge="end" tabIndex={-1} sx={{ color: 'primary.main', mr: 1 }}>
          <ArrowForwardIosIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}
