'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, Typography } from '@mui/material';
import SmsFailedOutlinedIcon from '@mui/icons-material/SmsFailedOutlined';

export default function ErrorSlot() {
  const t = useTranslations();

  return (
    <Card sx={{ width: '100%', maxWidth: 'none', boxShadow: 'none' }}>
      <CardContent>
        <SmsFailedOutlinedIcon color="error" sx={{ fontSize: 40, display: 'block', mx: 'auto', mb: 2 }} />
        <Typography variant="h6" fontWeight={600} textAlign="center">
          {t('movements.errorShowingMovements')}
        </Typography>
      </CardContent>
    </Card>
  );
}
