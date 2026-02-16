// Internal app
import { TenantStoreProps } from './store';
import type { Tenant } from './appInterface';

// Type definition for props that include React children
export type ChildrenProps = Readonly<{
  children: React.ReactNode;
}>;

/**
 * Type definition for props that include a promise resolving to an object with a tenant string.
 */
export type ParamsProps = {
  params: Promise<{
    tenant: string;
  }>;
};

/**
 * Type definition for props that include map of string keys and string values for theme UI.
 */
export type TenantSettProps = {
  tenantSett: TenantStoreProps['tenantSett'];
  tenantTheme: Tenant;
};

/**
 * Type definition for props that include a user attributes.
 */
export type DataServerProps = {
  userAttr: Record<string, any>;
};
