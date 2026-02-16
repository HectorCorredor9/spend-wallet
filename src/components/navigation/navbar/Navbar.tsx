'use client';

import { AppBar, Toolbar, Stack } from '@mui/material';
//Internal app
import SubMenu from './components/SubMenu';
import ChangeLang from './components/ChangeLang';
import ChangeMode from './components/ChangeMode';

export default function Navbar() {
  return (
    <AppBar position="relative">
      <Toolbar sx={{ justifyContent: 'flex-end', minHeight: { xs: '100%', md: 'initial' }, height: '64px' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <ChangeMode />
          <ChangeLang />
          <SubMenu />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
