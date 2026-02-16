import { Metadata } from 'next';
import { Container } from '@mui/material';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
// Internal App
import { availableTenant } from '@/utils';
import { assetSetts } from '@/tenants/tenantSettings';
import { ChildrenProps, ParamsProps } from '@/interfaces';
import {
  ClientProvider,
  GlobalError,
  GlobalModal,
  GlobalSuccess,
  LoadingScreen,
  MuiProvider,
  GlobalModalSuccess,
} from '@/components';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const { tenantImages, tenantPwa } = await assetSetts();

  return {
    title: {
      template: ` %s | ${t('static.brand')}`,
      default: t('static.brand'),
    },
    manifest: `/pwa/${tenantPwa}/manifest.webmanifest`,
    description: t('common.descriptionHeader'),
    icons: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        sizes: '32x32',
        url: `/images/${tenantImages}/favicon.ico`,
      },
    ],
  };
}

export default async function Tenantlayout({ children, params }: ChildrenProps & ParamsProps) {
  const { tenant: tenantUri } = await params;
  const tenant = availableTenant(tenantUri);
  const { tenantAllowed, tenantTheme, ...tenantSett } = await assetSetts();

  if (!tenantAllowed.includes(tenantUri)) {
    redirect(`/${tenantAllowed[0]}/signin`);
  }

  const tenantfeatures = { tenant, tenantUri, ...tenantSett };

  return (
    <MuiProvider tenantTheme={tenantTheme} tenantSett={{ ...tenantfeatures }}>
      <ClientProvider>
        <GlobalError />
        <GlobalSuccess />
        <LoadingScreen />
        <GlobalModal />
        <GlobalModalSuccess />
        <Container>{children}</Container>
      </ClientProvider>
    </MuiProvider>
  );
}
