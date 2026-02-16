'use client';

import { Backdrop, CircularProgress } from '@mui/material';
//Internal app
import { useUiStore } from '@/store/useUiStore';

export default function LoadingScreen() {
  const loadingScreen = useUiStore((state) => state.loadingScreen);

  return (
    <Backdrop open={loadingScreen} sx={{ color: '#fff', zIndex: 2001 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
