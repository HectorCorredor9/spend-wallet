import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { getTranslations } from 'next-intl/server';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Box, Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
//Internal app
import NeedHelpCard from './UI/NeedHelpCard';

function getVersion() {
  const raw = readFileSync(join(process.cwd(), 'package.json'), 'utf-8');
  return JSON.parse(raw).version as string;
}

export default async function About() {
  const t = await getTranslations();

  const version = getVersion();

  return (
    <Stack spacing={2}>
      <Stack direction="column" spacing={1} mb={2}>
        <Typography variant="h4" fontWeight={600}>
          {t('menu.about')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('about.description')}
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 2fr' },
          width: '100%',
          height: '100%',
          gap: 3,
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            height: { xs: '100%', lg: 'fit-content' },
            alignItems: { xs: 'center', lg: 'flex-start' },
          }}
        >
          <NeedHelpCard />

          <Card sx={{ display: { xs: 'block', lg: 'none' } }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                {t('about.termsConditions')}
              </Typography>
              <Button variant="contained" endIcon={<FileDownloadOutlinedIcon />}>
                {t('about.download')}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                {t('about.additionalInfo')}
              </Typography>

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  {t('about.appVersion')}
                </Typography>
                <Typography variant="body1">{version}</Typography>
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="body1">
                  &copy; {new Date().getFullYear()} {t('common.copyright')}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ width: '100%', height: '100%', display: { xs: 'none', lg: 'grid' }, gridTemplateRows: 'auto 1fr' }}>
          <Box sx={{ width: '100%', alignSelf: 'stretch' }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: 'calc(100vh - 400px)',
                maxWidth: 'none',
                p: 3,
              }}
            >
              <Typography variant="h6" fontWeight={600} mb={2}>
                {t('about.termsConditions')}
              </Typography>
              <CardContent sx={{ flex: 1, overflowY: 'auto', p: 0 }}>
                <Typography gutterBottom>{t('about.term')}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', mt: 2, p: 0 }}>
                <Button variant="contained" endIcon={<FileDownloadOutlinedIcon />}>
                  {t('about.download')}
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
