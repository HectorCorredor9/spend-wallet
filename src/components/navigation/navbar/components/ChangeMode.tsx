'use client';

import { IconButton } from '@mui/material';
import Sun from '@mui/icons-material/WbSunnyOutlined';
import Moon from '@mui/icons-material/BedtimeOutlined';
//Internal app
import { useModeStore } from '@/store';

export default function ChangeMode() {
  const mode = useModeStore((state) => state.mode);
  const changeMode = useModeStore((state) => state.changeMode);
  const currentMode = mode === 'light' ? 'dark' : 'light';

  return (
    <IconButton sx={{ '&:hover': { bgcolor: 'primary.light' } }} onClick={() => changeMode(currentMode)} size="small">
      {mode === 'light' ? <Moon sx={{ color: 'text.primary' }} /> : <Sun sx={{ color: 'text.primary' }} />}
    </IconButton>
  );
}
