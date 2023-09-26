'use client';

import './globalStyle.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Inter} from 'next/font/google';
import type {ReactNode} from 'react';

const inter = Inter({subsets: ['latin']});

const client = new QueryClient();
const RootLayout = ({children}: {children: ReactNode}) => (
  <html lang="en">
    <body className={inter.className}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </body>
  </html>
);

export default RootLayout;
