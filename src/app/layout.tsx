'use client';

import localFont from 'next/font/local';
import type {ReactNode} from 'react';

import Providers from '@/ui/providers';
import {PortalId} from '@components/atom/Portal/portal.enum';
import {Drawer} from '@components/organism';
import {Menu} from '@feature/sizeMenu/organism';

import '@/ui/styles/index.css';

const Pretendard = localFont({
  src: '../../public/font/PretendardVariable.woff2',
});

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({children}: RootLayoutProps) => (
  <html lang="ko">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>마음을 담다</title>
    </head>
    <body className={Pretendard.className}>
      <Providers>
        <Drawer>
          <Menu />
        </Drawer>
        <div id={PortalId.BottomSheet} />
        <div id={PortalId.Dialog} />
        <div id={PortalId.Toast} />
        {children}
      </Providers>
    </body>
  </html>
);

export default RootLayout;
