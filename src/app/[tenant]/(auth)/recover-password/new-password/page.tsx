import { getTranslations } from 'next-intl/server';
import { Typography, Card, CardContent } from '@mui/material';
//Internal app
import FormUpdatePassword from './UI/FormNewPassword';

export default async function NewPasswordPage() {
  const t = await getTranslations('recoverPassword');

  return (
    <Card variant="auth">
      <CardContent>
        <Typography variant="h4" color="textSecondary" align="center" mb={2} fontWeight={700}>
          {t('recoverPassword')}
        </Typography>

        <Typography variant="body1" color="textSecondary" align="center" mb={4}>
          {t('enterFollowingInfo')}
        </Typography>

        <FormUpdatePassword />
      </CardContent>
    </Card>
  );
}
