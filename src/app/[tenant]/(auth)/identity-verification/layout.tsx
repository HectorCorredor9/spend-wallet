import React from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
//Internal app
import { RootLayout } from '@/interfaces';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('identityVerification.title'),
  };
}

export default function IdentityVerificationLayout({ children }: Readonly<RootLayout>) {
  return <>{children}</>;
}
