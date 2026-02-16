import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: false,
  crossOrigin: 'anonymous',
  poweredByHeader: false,
  output: 'standalone',
  outputFileTracingIncludes: {
    '/*': ['./dictionary/**/*'],
  },
};

export default withNextIntl(nextConfig);
