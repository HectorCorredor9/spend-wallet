import { createTheme } from '@mui/material';
import type { Theme, ThemeOptions } from '@mui/material';
// Internal app
import { Tenant } from '@/interfaces';
import { tebcaTheme } from '@/tenants/tebca/uiThemeTebca';

export function createTenantTheme(tenant: Tenant, mode: string = 'light'): Theme {
  const tenantTheme: { [key: string]: unknown } = { tebca: tebcaTheme(mode) };

  const themeVars = tenantTheme[tenant] || tenantTheme.tebca;

  return createTheme(themeVars as ThemeOptions);
}
