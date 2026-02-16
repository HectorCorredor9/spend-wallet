import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
// Internal app
import { ChildrenProps } from '@/interfaces';

export default async function RootLayoutMain({ children }: ChildrenProps) {
  const lang = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={lang}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
