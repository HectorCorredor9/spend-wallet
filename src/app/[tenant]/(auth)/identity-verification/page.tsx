import { getTranslations } from 'next-intl/server';
import { Card, CardContent, Typography } from '@mui/material';
//Internal app
import FormIdentityVerification from './UI/FormIdentityVerification';

export default async function ProfilePage() {
  const t = await getTranslations();

  return (
    <Card variant="auth">
      <CardContent>
        <Typography variant="h4" color="textSecondary" align="center" mb={2} fontWeight={700}>
          {t('identityVerification.title')}
        </Typography>

        <Typography variant="body1" color="textSecondary" align="center" mb={4}>
          {t('identityVerification.description')}
        </Typography>

        <FormIdentityVerification />
      </CardContent>
    </Card>
  );
}
