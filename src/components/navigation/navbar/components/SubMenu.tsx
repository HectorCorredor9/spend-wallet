'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Logout from '@mui/icons-material/LogoutOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { IconButton, Typography, Menu, Box, Divider, MenuItem, ListItemText } from '@mui/material';
//Internal app
import { useTenantStore } from '@/store';
import { useSessionActions } from '@/hooks/useSessionActionsHook';

export default function SubMenu() {
  const t = useTranslations();
  const { signout } = useSessionActions();

  const { tenantUri } = useTenantStore((state) => state.tenantSett);

  const user = { name: 'Usuario Demo', email: 'usuario@demo.com', initials: 'UD' };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    handleClose();
    signout();
  };

  return (
    <>
      <IconButton
        onClick={handleMenu}
        size="small"
        sx={{
          p: 1,
          color: 'white',
          bgcolor: 'primary.main',
          '&:hover': { bgcolor: 'primary.main' },
          width: 36,
          height: 36,
        }}
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Typography variant="body2" color="white" fontWeight={700} display="contents">
          {user.initials}
        </Typography>
      </IconButton>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ px: 2, py: 1, minWidth: 220 }}>
          <Typography variant="subtitle1" fontWeight={600} noWrap>
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {user.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem component={Link} href={`/${tenantUri}/dashboard/profile/security`}>
          <ShieldOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
          <ListItemText>{t('common.changePassword')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleSignout}>
          <Logout fontSize="small" sx={{ mr: 1 }} />
          <ListItemText>{t('common.signout')}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
