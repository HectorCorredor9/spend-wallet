'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, Stack, Typography, Box, Skeleton } from '@mui/material';

export default function PersonalInformation() {
  const t = useTranslations();
  const [loading, setLoading] = useState(true);

  //TODO: Remove this timeout and replace it with the real API call to fetch the cards data. This is just to simulate a loading state.
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Stack direction="column" spacing={1} sx={{ display: { xs: 'none', lg: 'flex' } }}>
          <Typography variant="h6" fontWeight={600}>
            {t('profile.personalInfo.title')}
          </Typography>
        </Stack>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {loading ? (
            <Skeleton variant="circular" width={56} height={56} />
          ) : (
            <Box
              sx={{
                backgroundColor: 'primary.main',
                p: 1.5,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 56,
                height: 56,
              }}
            >
              <Typography variant="h4" color="white">
                UD
              </Typography>
            </Box>
          )}
          <Stack direction="column">
            {loading ? (
              <Skeleton variant="text" width={220} height={27} />
            ) : (
              <Typography variant="h6" fontWeight={600}>
                Usuario Usuario Demo Demo
              </Typography>
            )}
            {loading ? (
              <Skeleton variant="text" width={180} height={20} />
            ) : (
              <Typography variant="body2" color="text.secondary">
                usuario@demo.com
              </Typography>
            )}
            {loading ? (
              <Skeleton variant="text" width={120} height={20} />
            ) : (
              <Typography variant="body2" color="text.secondary">
                {t('common.dni')} 12345678
              </Typography>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
