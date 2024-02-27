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
    "우리 모두는 때때로 고민에 직면합니다. 그러나 그 고민을 누군가에게 털어놓기는 쉽지 않습니다. 이럴 때, 익명으로 고민을 나눌 수 있는 웹서비스 '바다편지'가 당신을 도울 수 있습니다. 당신의 고민이나 이야기를 유리병에 담아 바다로 보낸다면 유리병을 주운 누군가가 당신에게 답장을 보낼 거에요.바다편지는 사용자가 자신의 고민을 익명으로 공유하고, 다른 사람들의 공감과 조언을 얻을 수 있는 안전한 플랫폼을 제공합니다. 바다편지는 특히 주변 사람들에게 말하기 어려운 고민을 가진 사람들에게 큰 도움이 됩니다. 바다편지를 통해 당신의 이야기를 세상에 전하세요. 우리는 당신의 이야기를 듣고, 함께 고민을 해결하는 데 도움이 되고자 합니다.",
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
