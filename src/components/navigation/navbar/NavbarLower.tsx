'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import More from '@mui/icons-material/MoreHorizOutlined';
import SendIconsLine from '@mui/icons-material/NearMeOutlined';
import HomeIconsLine from '@mui/icons-material/DashboardOutlined';
import SyncIconsLine from '@mui/icons-material/SwapHorizOutlined';
import ProfileIconLine from '@mui/icons-material/PersonOutlineOutlined';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
//Internal app
import { NavbarLowerProps } from '@/interfaces';
import { handleConfigTenant } from '@/utils/tools';
import { useMenuStore, useTenantStore } from '@/store';

/**
 * Bottom bar to show menu items in responsive.
 *
 * @remarks
 *
 * This component has persistence with Zustand and is being passed (Home, Recharge, Transfer and Charge)
 */
export default function NavbarLower(props: Readonly<NavbarLowerProps>) {
  const { onCLickDrawer } = props;
  const t = useTranslations();

  const currentItem = useMenuStore((state) => state.currentItem);
  const setCurrentItem = useMenuStore((state) => state.setCurrentItem);
  const { tenant, tenantUri } = useTenantStore((state) => state.tenantSett);

  const { menu } = handleConfigTenant(tenant);

  return (
    <Box
      sx={{
        display: { md: 'none' },
        height: 80,
        backgroundColor: 'grey.200',
        bottom: 0,
        position: 'fixed',
        width: '100%',
        zIndex: 1199,
      }}
    >
      <List sx={{ display: 'flex' }} disablePadding>
        {menu.map((menu: Record<string, string>) => {
          const currentItemMenu = currentItem === menu.id;

          const iconMap: { [key: string]: JSX.Element } = {
            home: <HomeIconsLine />,
            send: <SendIconsLine />,
            movements: <SyncIconsLine />,
            profile: <ProfileIconLine />,
          };

          const getIconById = (icon: string) => {
            return iconMap[icon] || null;
          };

          const icon = getIconById(menu.id);

          return (
            <ListItem
              sx={{ display: menu.pwa ? 'flex' : 'none' }}
              disablePadding
              key={menu.id}
              onClick={() => setCurrentItem(menu.id)}
            >
              <ListItemButton
                disabled={currentItemMenu}
                component={Link}
                href={`/${tenantUri}/${menu.url}`}
                selected={currentItemMenu}
                sx={{ flexDirection: 'column', '&.Mui-selected': { backgroundColor: 'initial', opacity: 1 } }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 'auto',
                    backgroundColor: currentItemMenu ? 'primary.main' : 'initial',
                    color: currentItemMenu ? 'common.white' : 'initial',
                    borderRadius: 4,
                    px: 3,
                    py: 1,
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={t(`menu.${menu.id}`)}
                  slotProps={{
                    primary: { fontWeight: currentItemMenu ? 700 : 400, fontSize: { xs: 10, md: 'initial' } },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
        <ListItem sx={{ display: 'flex' }} disablePadding onClick={onCLickDrawer}>
          <ListItemButton
            sx={{ flexDirection: 'column', px: 0, '&.Mui-selected': { backgroundColor: 'initial', opacity: 1 } }}
          >
            <ListItemIcon sx={{ minWidth: 'auto', backgroundColor: 'initial', borderRadius: 4, px: 3, py: 1 }}>
              <More />
            </ListItemIcon>
            <ListItemText
              primary={t('common.more')}
              slotProps={{
                primary: { fontWeight: 400, color: 'primary.main', fontSize: { xs: 10, md: 'initial' } },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
