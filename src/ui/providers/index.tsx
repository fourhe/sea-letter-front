'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider, createStore} from 'jotai';
import type {ReactNode} from 'react';
import {ThemeProvider} from 'styled-components';

import GlobalStyle from '@/ui/styles/global-styles';
import theme, {ColorScheme} from '@/ui/styles/theme';
import StyledComponentsRegistry from '@lib/registry';

const client = new QueryClient({defaultOptions: {queries: {retry: false}}});

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
            <GlobalStyle />
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </Provider>
    </QueryClientProvider>
  );
};

export default Providers;
