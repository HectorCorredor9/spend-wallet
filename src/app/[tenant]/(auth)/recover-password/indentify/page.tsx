import { getTranslations } from 'next-intl/server';
import { Typography, Card, CardContent } from '@mui/material';
//Internal app
import FormIdentify from './UI/FormIdentify';

export default async function IndentifyPage() {
  const t = await getTranslations('recoverPassword');

  return (
    <Card variant="auth">
      <CardContent>
        <Typography variant="h4" color="textSecondary" align="center" mb={2} fontWeight={700}>
          {t('recoverPassword')}
        </Typography>

        <Typography variant="body1" color="textSecondary" align="center" mb={4}>
          {t('instructions')}
        </Typography>

        <FormIdentify />
      </CardContent>
    </Card>
  );
}
