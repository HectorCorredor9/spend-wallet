'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography, Link as LinkMui, AppBar, Toolbar, Box } from '@mui/material';
//Internal app
import { useTenantStore } from '@/store';
import { getImages } from '@/utils/tools';

export default function NavbarExternal() {
  const t = useTranslations();
  const { tenant, tenantUri } = useTenantStore((state) => state.tenantSett);

  return (
    <AppBar position="relative">
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: '100%', md: 'initial' }, height: '80px' }}>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Image src={getImages(tenant, 'img-logo-color.svg')} height={60} alt={`Picture of ${tenant}`} priority />
        </Box>

        <LinkMui
          component={Link}
          href={`/${tenantUri}/signin`}
          sx={{ display: { xs: 'none', md: 'flex' }, textDecoration: 'none' }}
        >
          <ArrowBackIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" color="primary.main">
            {t('common.goSignIn')}
          </Typography>
        </LinkMui>
      </Toolbar>
    </AppBar>
  );
}
