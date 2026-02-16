import { create } from 'zustand';
import type { StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
// Internal app
import { TenantStoreProps } from '@/interfaces';
import { defaultTenant, tenantPrefix } from '@/constans';

const storeApi: StateCreator<TenantStoreProps, [['zustand/devtools', never]]> = (set) => ({
  tenantSett: {
    sessExpTime: 0,
    sessResetTime: 0,
    tenant: defaultTenant,
    tenantImages: defaultTenant,
    tenantPwa: defaultTenant,
    tenantUri: `${tenantPrefix}${defaultTenant}`,
    webUrl: '',
  },
  setTenantSett: (tenantSett) => set(() => ({ tenantSett }), false, 'setTenantSett'),
});

/**
 * `useTenantStore` is a Zustand store that manages the tenant state.
 *
 * @example
 * ```tsx
 * import { useTenantStore } from '@/store/useTenantStore';
 *
 * const { tenant, webUrl, tenantImages } = useTenantStore((state) => state.tenantSett);
 * const setTenantSett = useTenantStore((state) => state.setTenantSett);
 * ```
 *
 * @returns {object} The state and actions of the tenant store.
 * @property {TenantSettings} tenantSett - The current tenant settings.
 * @property {function} setTenantSett - A function to set the tenant settings.
 */
export const useTenantStore = create<TenantStoreProps>()(devtools(storeApi, { name: 'tenantStore' }));
