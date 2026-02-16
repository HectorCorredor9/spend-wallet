import { getTranslations } from 'next-intl/server';
import { Card, CardContent, Typography } from '@mui/material';
//Internal app
import FormUpdatePassword from './UI/FormUpdatePassword';

export default async function UpdatePasswordPage() {
  const t = await getTranslations();

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" color="textSecondary" align="center" mb={2} fontWeight={700}>
          {t('signin.welcome')}
        </Typography>

        <Typography variant="body1" color="textSecondary" align="center" mb={4}>
          {t('signin.securityPassword')}
        </Typography>

        <FormUpdatePassword />
      </CardContent>
    </Card>
  );
}
