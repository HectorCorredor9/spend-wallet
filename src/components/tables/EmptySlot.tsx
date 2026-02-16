'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, Typography } from '@mui/material';
import SpeakerNotesOutlinedIcon from '@mui/icons-material/SpeakerNotesOutlined';

export default function EmptySlot() {
  const t = useTranslations();

  return (
    <Card sx={{ width: '100%', maxWidth: 'none', boxShadow: 'none' }}>
      <CardContent>
        <SpeakerNotesOutlinedIcon color="primary" sx={{ fontSize: 40, display: 'block', mx: 'auto', mb: 2 }} />
        <Typography variant="h6" fontWeight={600} textAlign="center">
          {t('movements.notMovements')}
        </Typography>
      </CardContent>
    </Card>
  );
}
