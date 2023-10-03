import {Inter} from 'next/font/google';
import type {ReactNode} from 'react';

import Providers from '@/ui/providers';

const inter = Inter({subsets: ['latin']});

type Props = {
  children: ReactNode;
};
const RootLayout = (props: Props) => {
  const {children} = props;
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>마음을 담다</title>
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
