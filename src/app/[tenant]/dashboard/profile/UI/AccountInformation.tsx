'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, Stack, Typography, Box, Chip, Skeleton } from '@mui/material';

export default function AccountInformation() {
  const t = useTranslations();
  const [loading, setLoading] = useState(true);

  //TODO: Remove this timeout and replace it with the real API call to fetch the cards data. This is just to simulate a loading state.
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Card sx={{ display: { xs: 'none', lg: 'block' } }}>
      <CardContent>
        <Stack direction="column" spacing={1}>
          <Typography variant="h6" fontWeight={600}>
            {t('profile.accountInfo.title')}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {t('profile.accountInfo.createdAt')}
            </Typography>
            {loading ? (
              <Skeleton variant="text" width={130} height={20} />
            ) : (
              <Typography variant="body2">15 de enero de 2024</Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {t('profile.accountInfo.country')}
            </Typography>
            {loading ? (
              <Skeleton variant="text" width={40} height={20} />
            ) : (
              <Typography variant="body2">Perú</Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {t('profile.accountInfo.mfa')}
            </Typography>
            {loading ? (
              <Skeleton variant="text" width={90} height={24} />
            ) : (
              <Chip
                label={t('profile.accountInfo.activated')}
                color="success"
                size="small"
                sx={{ fontWeight: 600, fontSize: 13, letterSpacing: 0.5 }}
                icon={
                  <Box
                    component="span"
                    sx={{ display: 'block', width: 8, height: 8, borderRadius: '50%', backgroundColor: 'success.main' }}
                  />
                }
              />
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
