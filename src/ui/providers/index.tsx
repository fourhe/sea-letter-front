'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {createStore, Provider} from 'jotai';
import type {ReactNode} from 'react';
import {ThemeProvider} from 'styled-components';

import theme, {ColorScheme} from '@/ui/styles/theme';
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
          <ThemeProvider theme={theme[ColorScheme.LIGHT]}>
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </Provider>
      <ReactQueryDevtools client={client} initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Providers;
