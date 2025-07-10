import './globals.css';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VYBZ Admin | 버스커 라이브 스트리밍 관리자 대시보드',
  description:
    'VYBZ 버스커 라이브 스트리밍 플랫폼의 관리자 대시보드입니다. 라이브 방송, 사용자, 결제 내역 등을 관리할 수 있습니다.',
  keywords: [
    'VYBZ',
    '버스커',
    '라이브 스트리밍',
    '관리자',
    '대시보드',
    '버스킹',
    '공연',
  ],
  authors: [{ name: 'VYBZ', url: 'https://admin.vybz.kr/' }],
  openGraph: {
    title: 'VYBZ Admin | 버스커 라이브 스트리밍 관리자 대시보드',
    description: 'VYBZ 버스커 라이브 스트리밍 플랫폼의 관리자 대시보드입니다.',
    url: 'https://admin.vybz.kr',
    siteName: 'VYBZ Admin',
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  themeColor: '#ffffff',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className}>{children}</body>
    </html>
  );
}
