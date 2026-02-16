import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: false,
  crossOrigin: 'anonymous',
  poweredByHeader: false,
  output: 'standalone',
  serverExternalPackages: ['ioredis'],
};

export default withNextIntl(nextConfig);
