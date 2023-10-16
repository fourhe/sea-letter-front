import {Inter} from 'next/font/google';
import type {ReactNode} from 'react';

import Providers from '@/ui/providers';
import {PortalId} from '@components/atom/Portal/portal.enum';

const inter = Inter({subsets: ['latin']});

type RootLayoutProps = {
  children: ReactNode;
  drawer: ReactNode;
};

const RootLayout = (props: RootLayoutProps) => {
  const {children, drawer} = props;
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>마음을 담다</title>
      </head>
      <body className={inter.className}>
        <Providers>
          {drawer}
          <div id={PortalId.BottomSheet} />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
