import React from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
//Internal app
import { RootLayout } from '@/interfaces';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('menu.movements') };
}

export default function Movementslayout({ children }: Readonly<RootLayout>) {
  return <>{children}</>;
}
