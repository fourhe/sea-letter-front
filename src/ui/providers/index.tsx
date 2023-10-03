'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'jotai';
import type {NextPage} from 'next';
import type {ReactNode} from 'react';
import {ThemeProvider} from 'styled-components';

import GlobalStyle from '@/ui/styles/global-styles';
import theme, {ColorScheme} from '@/ui/styles/theme';
import StyledComponentsRegistry from '@lib/registry';

const client = new QueryClient();

type ProvidersProps = {
  children: ReactNode;
};

const Providers: NextPage<ProvidersProps> = props => {
  const {children} = props;

  return (
    <QueryClientProvider client={client}>
      <Provider>
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
