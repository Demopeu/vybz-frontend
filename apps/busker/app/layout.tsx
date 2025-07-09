import './globals.css';
import type { Metadata } from 'next';

import { Inter, Monoton, Roboto, Poppins } from 'next/font/google';
import TanstackQueryProvider from '@/provider/TanstackQueryProvider';
import SessionWrapper from './providers/SessionWrapper';
import FcmClientProvider from './providers/FcmClientProvider';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const monoton = Monoton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-monoton',
});
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
});
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'VYBZ | 버스커와 함께하는 실시간 라이브 스트리밍 플랫폼',
  description:
    'VYBZ는 버스커와 팬을 연결하는 실시간 라이브 스트리밍 플랫폼입니다. 다양한 버스킹 공연을 실시간으로 즐기고, 버스커를 응원해보세요!',
  keywords: [
    'VYBZ',
    '버스커',
    '라이브 스트리밍',
    '버스킹',
    '실시간 방송',
    '음악',
    '공연',
    '버스커 지원',
    '버스킹 플랫폼',
  ],
  authors: [{ name: 'VYBZ', url: 'https://busker.vybz.kr' }],
  openGraph: {
    title: 'VYBZ | 버스커와 함께하는 실시간 라이브 스트리밍',
    description:
      'VYBZ에서 다양한 버스킹 공연을 실시간으로 즐기고, 버스커를 응원해보세요!',
    url: 'https://busker.vybz.kr',
    siteName: 'VYBZ',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/busker.vybz.kr_main.jpg',
        width: 1200,
        height: 630,
        alt: 'VYBZ - 버스커 라이브 스트리밍 플랫폼',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VYBZ | 버스커와 함께하는 실시간 라이브 스트리밍',
    description:
      'VYBZ에서 다양한 버스킹 공연을 실시간으로 즐기고, 버스커를 응원해보세요!',
    images: ['/busker.vybz.kr_main.jpg'],
  },
  themeColor: '#000000',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  return (
    <html
      lang="en"
      className={`${inter.variable} ${monoton.variable} ${roboto.variable} ${poppins.variable}`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link
          rel="icon"
          href="https://vybz.s3.ap-northeast-2.amazonaws.com/vybz_logo.png"
        />
      </head>
      <body className="font-inter">
        <TanstackQueryProvider>
          <SessionWrapper session={session}>
            <FcmClientProvider />
            {children}
          </SessionWrapper>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
