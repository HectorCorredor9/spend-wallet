'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
//Internal app
import { Card, CardContent, Typography, Box, Stack, Skeleton } from '@mui/material';

export default function Banner({ user }: { user: { name: string } }) {
  const t = useTranslations('dashboard');

  const [loading, setLoading] = useState(true);

  const greeting = useMemo(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return t('goodMorning');
    if (currentHour < 18) return t('goodAfternoon');
    return t('goodEvening');
  }, [t]);

  //TODO: Remove this timeout and replace it with the real API call to fetch the cards data. This is just to simulate a loading state.
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [user]);

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        maxWidth: 'none',
        boxShadow: 'none',
        borderTop: '10px solid',
        borderColor: 'primary.main',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '8rem',
          height: '8rem',
          borderRadius: '9999px',
          backgroundColor: 'rgba(68, 68, 68, 0.05)',
          transform: 'translateY(50%) translateX(-50%)',
        }}
      />

      <CardContent sx={{ width: '100%' }}>
        <Stack direction="column" spacing={1}>
          <Typography variant="body2" gutterBottom>
            {greeting},
          </Typography>
          {loading ? (
            <Skeleton variant="text" width={220} height={29.6} />
          ) : (
            <Typography variant="h4">{user.name} 👋</Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
