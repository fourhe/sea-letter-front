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
  title: '바다편지',
  description:
    '당신의 이야기를 유리병에 담아 바다로 보내보세요. 유리병을 주운 누군가가 당신에게 답장을 보낼 거예요. 고민이 있는 당신을 위한 익명 편지 서비스.',
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
    {process.env.NODE_ENV === 'production' && (
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <meta
          name="naver-site-verification"
          content="1f555e4d40fae007db49a89631e5b6552c104226"
        />
      </head>
    )}
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
