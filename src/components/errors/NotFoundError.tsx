'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Grid2, Typography, Button } from '@mui/material';
//Internal app
import { getImages } from '@/utils/tools';
import { NotFoundErrorProps } from '@/interfaces';

function ErrorMessage({ code }: Readonly<NotFoundErrorProps>) {
  const t = useTranslations();

  return (
    <Box textAlign={{ xs: 'left', sm: 'center', md: 'left' }}>
      <Typography component="h1" gutterBottom sx={{ fontSize: '2rem', lineHeight: 1.2, fontWeight: 600, color: { xs: 'inherit', md: "white" } }}>
        {code === 404 ? t('common.titleError404') : t('common.titleError500')}
      </Typography>
      <Typography variant="h5" sx={{ fontSize: '1.25rem', lineHeight: 1.334, fontWeight: 400, color: { xs: 'inherit', md: "white" } }}>
        {code === 404 ? t('common.msgError404') : t('common.msgError500')}
      </Typography>
    </Box>
  );
}

export default function NotFoundError({ code, tenant }: Readonly<NotFoundErrorProps>) {
  const t = useTranslations();
  const { back } = useRouter();

  return (
    <Grid2 container spacing={3} height="100vh">
      <Grid2
        size={{ md: 5 }}
        className="gradientBlue"
        display={{ xs: 'none', md: 'flex' }}
        justifyContent="center"
        bgcolor="primary.main"
      >
        <Box sx={{ px: { md: 4, lg: 6 }, py: 2 }}>
          <Box display="flex" flexDirection="column" justifyContent="space-between" height="93vh">
            <Image
              src={tenant ? getImages(tenant, 'img-logo-color.svg') : '/path/to/default/image.svg'}
              height={50}
              alt={`Picture of ${tenant}`}
              priority
            />
            <ErrorMessage code={code} />
            <Box textAlign="center">
              <Image
                src={tenant ? getImages(tenant, 'logo.svg') : '/path/to/default/image.svg'}
                height={32}
                alt={`Picture of ${tenant}`}
                priority
              />
            </Box>
          </Box>
        </Box>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 7 }} display="flex" alignItems="center" justifyContent="center">
        <Box>
          <Box display={{ xs: 'flex', md: 'none' }} justifyContent="center">
            <Image
              src={tenant ? getImages(tenant, `${code ?? '500'}.png`) : '/path/to/default/image.svg'}
              height={150}
              alt={`Picture of ${tenant}`}
              priority
            />
          </Box>
          <Box display={{ xs: 'none', md: 'flex' }}>
            <Image
              src={tenant ? getImages(tenant, `${code ?? '500'}.png`) : '/path/to/default/image.svg'}
              height={350}
              alt={`Picture of ${tenant}`}
              priority
            />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Box display={{ xs: 'block', md: 'none' }} mx={4} mb={4}>
              <ErrorMessage code={code} />
            </Box>
            <Button
              variant="text"
              fullWidth
              onClick={() => back()}
              startIcon={<ArrowBackIcon sx={{ mr: 1, color: 'primary.main' }} />}
            >
              {t('common.goBack')}
            </Button>
          </Box>
        </Box>
      </Grid2>
    </Grid2>
  );
}
