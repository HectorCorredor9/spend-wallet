'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Typography, Box } from '@mui/material';
//Internal app
import { useTenantStore } from '@/store';
import { getImages } from '@/utils/tools';
import { RootLayout } from '@/interfaces';
import { SupportWidget } from '@/components';

export default function Template({ children }: Readonly<RootLayout>) {
  const t = useTranslations();

  const { tenant } = useTenantStore((state) => state.tenantSett);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', backgroundColor: 'grey.100' }}
    >
      <Box component="header" sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'background.paper' }}>
        <Box
          sx={{
            width: '100%',
            mx: 'auto',
            px: 4,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            justifyContent: { xs: 'center', sm: 'flex-start' },
          }}
        >
          <Image
            src={getImages(tenant, 'img-logo-color.svg')}
            width={70}
            height={40}
            alt={`Picture of ${tenant}`}
            priority
          />
        </Box>
      </Box>

      <Box
        component="main"
        sx={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', p: { xs: 1, lg: 3 } }}
      >
        {children}
      </Box>

      <Box component="footer" sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'grey.100' }}>
        <Box
          sx={{
            width: '100%',
            mx: 'auto',
            px: 4,
            py: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="caption">
            &copy; {new Date().getFullYear()} {t('common.copyright')}
          </Typography>
        </Box>
      </Box>

      <SupportWidget />
    </Box>
  );
}
