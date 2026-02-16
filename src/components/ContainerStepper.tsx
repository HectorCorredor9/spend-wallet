'use client';

import { JSX } from 'react';
import { useTranslations } from 'next-intl';
//Internal app
import { Card, CardContent, Typography } from '@mui/material';

export default function ContainerStepper(props: Readonly<{ currentStep: number; children: JSX.Element[] }>) {
  const { currentStep, children } = props;
  const t = useTranslations();

  return (
    <Card sx={{ mt: 4, width: '100%', maxWidth: 'none' }} variant="auth">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {t('signup.title')}
        </Typography>
        {children[currentStep]}
      </CardContent>
    </Card>
  );
}
