'use client';

import Link from 'next/link';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
//Internal app
import { ItemSecondarySidebarProps } from '@/interfaces';

/**
 * Child items that do not change in the menu.
 *
 * @param color - Element text color.
 * @param text - Element text.
 * @param icon - Item custom icon.
 * @param href - Item link.
 * @param onClick - Handle action.
 */
export default function ItemSecondarySidebar(props: Readonly<ItemSecondarySidebarProps>) {
  const { color, text, icon, href, onClick } = props;

  return (
    <ListItem disablePadding sx={{ width: { xs: 244, md: 'auto' }, my: { xs: 1 / 2, md: 0 } }} onClick={onClick}>
      <ListItemButton component={Link} href={href} sx={{ textDecoration: 'none' }}>
        <ListItemIcon sx={{ minWidth: 'auto', mr: 3 / 2, color: color ? 'red' : 'initial' }}>{icon}</ListItemIcon>
        <ListItemText
          primary={text}
          slotProps={{
            primary: {
              fontWeight: 700,
              color: color ? 'red' : 'initial',
              fontSize: { xs: 14, md: 'initial' },
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}
