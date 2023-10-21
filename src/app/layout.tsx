import {Inter} from 'next/font/google';
import type {ReactNode} from 'react';

import Providers from '@/ui/providers';
import {PortalId} from '@components/atom/Portal/portal.enum';
import {Drawer} from '@components/organism';

const inter = Inter({subsets: ['latin']});

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = (props: RootLayoutProps) => {
  const {children} = props;
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>마음을 담다</title>
      </head>
      <body className={inter.className}>
        <Providers>
          <Drawer>
            <ul>
              <li>menu1</li>
              <li>menu2</li>
            </ul>
          </Drawer>
          <div id={PortalId.BottomSheet} />
          <div id={PortalId.Dialog} />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
