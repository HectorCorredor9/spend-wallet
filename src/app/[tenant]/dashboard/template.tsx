'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
// Internal app
import { useMenuStore } from '@/store';
import { RootLayout } from '@/interfaces';
import { useSessionControl } from '@/hooks';
import { Navbar, NavbarLower, Sidebar } from '@/components';

export default function Template({ children }: Readonly<RootLayout>) {
  useSessionControl();
  const drawerWidth = 280;

  const drawerStatus = useMenuStore((s) => s.drawerStatus);
  const setDrawerStatus = useMenuStore((s) => s.setDrawerStatus);

  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setDrawerStatus(false);
  };

  const handleDrawerTransitionEnd = () => setIsClosing(false);

  const handleDrawerToggle = () => {
    if (!isClosing) setDrawerStatus(!drawerStatus);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar
        open={drawerStatus}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        drawerWidth={drawerWidth}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Navbar />
        <Box component="main" sx={{ minHeight: { xs: '100%', md: `calc(100% - 64px)` }, flex: 1 }}>
          <Box
            sx={{
              px: 3,
              pb: 3,
              pt: { xs: 2, md: 0 },
              width: '100%',
              minHeight: '100vh',
              maxWidth: '96rem',
              display: 'block',
              mx: 'auto',
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
      <NavbarLower onCLickDrawer={handleDrawerToggle} />
    </Box>
  );
}
