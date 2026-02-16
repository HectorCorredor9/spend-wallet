import { getTranslations } from 'next-intl/server';
//Internal app
import FormMfa from './UI/FormMfa';
import { Typography, Card, CardContent } from '@mui/material';

export default async function MfaPage() {
  const t = await getTranslations();

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" color="textSecondary" align="center" mb={2} fontWeight={700}>
          {t('mfa.title')}
        </Typography>

        <Typography variant="body1" color="textSecondary" align="center" mb={4}>
          {t('mfa.instruction')}
        </Typography>

        <FormMfa />
      </CardContent>
    </Card>
  );
}
