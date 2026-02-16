import { Metadata } from 'next';
//Internal app
import { getTranslations } from 'next-intl/server';
import { ChildrenProps, ParamsProps } from '@/interfaces';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: {
      template: ` %s | ${t('static.brand')}`,
      default: t('menu.home'),
    },
  };
}

export default async function Dashboardlayout({ children }: ChildrenProps & ParamsProps) {
  return <>{children}</>;
}
