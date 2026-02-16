import { getTranslations } from 'next-intl/server';
//Internal app
import FormSignin from './UI/FormSignin';
import { Typography, Card, CardContent } from '@mui/material';

export default async function SigninPage() {
  const t = await getTranslations();

  return (
    <Card variant="auth">
      <CardContent>
        <Typography variant="h4" color="textSecondary" align="center" mb={2} fontWeight={700}>
          {t('signin.welcome')}
        </Typography>

        <Typography variant="body1" color="textSecondary" align="center" mb={4}>
          {t('signin.enterCredentials')}
        </Typography>

        <FormSignin />
      </CardContent>
    </Card>
  );
}
