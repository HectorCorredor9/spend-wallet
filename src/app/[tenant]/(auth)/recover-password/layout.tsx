import React from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
//Internal app
import { RootLayout } from '@/interfaces';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('recoverPassword');

  return {
    title: t('recoverPassword'),
  };
}

export default function RecoverPasswordLayout({ children }: Readonly<RootLayout>) {
  return <>{children}</>;
}
