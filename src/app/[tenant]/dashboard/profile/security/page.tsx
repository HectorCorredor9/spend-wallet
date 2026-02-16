import { getTranslations } from 'next-intl/server';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
//Internal app
import FormChangePassword from './UI/FormChangePassword';

export default async function SecurityPage() {
  const t = await getTranslations();

  return (
    <Stack spacing={2}>
      <Stack direction="column" spacing={1} mb={2}>
        <Typography variant="h4" fontWeight={600}>
          {t('security.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('security.description')}
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-start' },
          width: '100%',
          height: '100%',
          gap: 3,
        }}
      >
        <Card>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  backgroundColor: 'primary.main',
                  p: 1.5,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShieldOutlinedIcon sx={{ fontSize: 32, color: 'white' }} />
              </Box>
              <Stack direction="column">
                <Typography variant="h6" fontWeight={600}>
                  {t('common.changePassword')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('security.form.description')}
                </Typography>
              </Stack>
            </Box>
            <FormChangePassword />
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
}
