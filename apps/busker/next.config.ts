import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import nextPwa from 'next-pwa';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = nextPwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === 'development',
});

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      new URL('https://lh3.googleusercontent.com/**'),
      new URL('https://k.kakaocdn.net/**'),
      new URL('https://vybz.s3.ap-northeast-2.amazonaws.com/**'),
      new URL('https://s3.ap-northeast-2.amazonaws.com/**'),
    ],
  },
};

export default bundleAnalyzer(withPWA(nextConfig));
