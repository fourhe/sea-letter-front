import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/next';
import type {Metadata} from 'next';
import localFont from 'next/font/local';
import type {ReactNode} from 'react';

import Providers from '@/ui/providers';
import {PortalId} from '@components/atom/Portal/portal.enum';
import {Drawer} from '@components/organism';
import {Menu} from '@feature/sideMenu/components/organism';
import '@/ui/styles/index.css';

export const metadata: Metadata = {
  title: '마음을 담다',
  description: '상처 받은 마음을 치유하는 공간',
};

const Pretendard = localFont({
  src: './font/PretendardVariable.woff2',
  variable: '--Pretendard',
});

const RIDIBatang = localFont({
  src: './font/RIDIBatang.otf',
  variable: '--RIDIBatang',
});

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({children}: RootLayoutProps) => (
  <html lang="ko">
    <head>
      <meta
        httpEquiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      />
    </head>
    <body className={`${Pretendard.className} ${RIDIBatang.variable}`}>
      <Providers>
        <Drawer>
          <Menu />
        </Drawer>
        <div id={PortalId.BottomSheet} />
        <div id={PortalId.Dialog} />
        <div id={PortalId.Toast} />
        {children}
      </Providers>
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
);

export default RootLayout;
