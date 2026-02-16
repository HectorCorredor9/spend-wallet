'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Logout from '@mui/icons-material/Logout';
import SendIconsLine from '@mui/icons-material/NearMeOutlined';
import HomeIconsLine from '@mui/icons-material/DashboardOutlined';
import KeyIconsLine from '@mui/icons-material/PrivacyTipOutlined';
import SyncIconsLine from '@mui/icons-material/SwapHorizOutlined';
import LegalIconsLine from '@mui/icons-material/DescriptionOutlined';
import CashOperationsIconLine from '@mui/icons-material/GroupOutlined';
import ProfileIconLine from '@mui/icons-material/PersonOutlineOutlined';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
//Internal app
import { useSessionActions } from '@/hooks';
import { handleConfigTenant } from '@/utils/tools';
import { useMenuStore, useTenantStore } from '@/store';

export default function ItemsSidebar() {
  const t = useTranslations();

  const currentItem = useMenuStore((state) => state.currentItem);
  const setCurrentItem = useMenuStore((state) => state.setCurrentItem);
  const setDrawerStatus = useMenuStore((state) => state.setDrawerStatus);
  const { tenant, tenantUri } = useTenantStore((state) => state.tenantSett);

  const { menu } = handleConfigTenant(tenant);
  const { signout } = useSessionActions();

  return (
    <List sx={{ width: '100%' }}>
      <Box sx={{ width: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 1 }}>
        {menu.map((menu: Record<string, string>) => {
          const currentItemMenu = currentItem === menu.id;

          const iconMap: { [key: string]: JSX.Element } = {
            home: <HomeIconsLine />,
            send: <SendIconsLine />,
            movements: <SyncIconsLine />,
            cashoperations: <CashOperationsIconLine />,
            updatepassword: <KeyIconsLine />,
            profile: <ProfileIconLine />,
            about: <LegalIconsLine />,
          };

          const getIconById = (icon: string) => {
            return iconMap[icon] || null;
          };

          const icon = getIconById(menu.id);

          return (
            <ListItem
              key={menu.id}
              disablePadding
              sx={{ display: { xs: !menu.pwa ? 'flex' : 'none', md: 'flex' } }}
              onClick={() => {
                setCurrentItem(menu.id);
                setDrawerStatus(false);
              }}
            >
              <ListItemButton
                disabled={currentItemMenu}
                component={Link}
                href={`/${tenantUri}/${menu.url}`}
                selected={currentItemMenu}
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  '&.Mui-selected': {
                    backgroundColor: currentItemMenu ? 'primary.main' : 'initial',
                    opacity: 1,
                  },
                  '&:hover': { backgroundColor: 'primary.light' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', mr: 1, color: currentItemMenu ? 'white' : 'initial' }}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={t(`menu.${menu.id}`)}
                  slotProps={{
                    primary: { fontWeight: currentItemMenu ? 700 : 400, color: currentItemMenu ? 'white' : 'initial' },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
        <ListItem
          disablePadding
          sx={{ display: { xs: 'flex', md: 'none' } }}
          onClick={() => {
            setDrawerStatus(false);
          }}
        >
          <ListItemButton onClick={signout} sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <ListItemIcon sx={{ minWidth: 'auto', mr: 1, color: 'primary.main' }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary={t('common.signout')} slotProps={{ primary: { color: 'primary.main' } }} />
          </ListItemButton>
        </ListItem>
      </Box>
    </List>
  );
}
