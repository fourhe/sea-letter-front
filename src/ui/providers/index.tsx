'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {createStore, Provider} from 'jotai';
import {GoogleAnalytics} from 'nextjs-google-analytics';
import type {ReactNode} from 'react';
import {ThemeProvider} from 'styled-components';

import theme from '@/ui/styles/theme';
import StyledComponentsRegistry from '@lib/registry';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const store = createStore();

type ProvidersProps = {
  children: ReactNode;
};

const Providers = (props: ProvidersProps) => {
  const {children} = props;

  return (
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </Provider>
      <ReactQueryDevtools client={client} initialIsOpen={false} />
      <GoogleAnalytics
        gaMeasurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
        trackPageViews
        strategy="lazyOnload"
        debugMode={process.env.NODE_ENV === 'development'}
      />
    </QueryClientProvider>
  );
};

export default Providers;
