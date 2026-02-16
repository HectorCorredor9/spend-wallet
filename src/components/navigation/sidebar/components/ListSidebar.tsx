'use client';

import Image from 'next/image';
import { Box, useTheme } from '@mui/material';
//Internal app
import { useTenantStore } from '@/store';
import ItemsSidebar from './ItemsSidebar';
import { getImages } from '@/utils/tools';

export default function ListSidebar() {
  const theme = useTheme();
  const { tenant } = useTenantStore((state) => state.tenantSett);

  return (
    <>
      <Box
        sx={{
          my: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          height: 80,
          borderRadius: 1 / 2,
          width: 105,
          mx: 'auto',
        }}
      >
        <Image src={getImages(tenant, 'logo.svg')} height={60} alt={`Picture of ${tenant}`} priority />
      </Box>

      <Box
        sx={{
          px: 2,
          height: '100%',
          display: 'flex',
          bgcolor: 'white',
          cursor: 'pointer',
          alignItems: 'center',
          flexDirection: 'column',
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
        }}
      >
        <ItemsSidebar />
      </Box>
    </>
  );
}
