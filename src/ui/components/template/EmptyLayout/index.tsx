import type {ReactNode} from 'react';
import styled from 'styled-components';

import {Header} from '@components/molecule';
import type {
  HeaderCenterProps,
  HeaderContainerProps,
  HeaderLeftProps,
  HeaderRightProps,
} from '@components/molecule/Header';

type EmptyLayoutProps = {
  children: ReactNode;
  headerShown?: boolean;
  headerContainerProps?: HeaderContainerProps;
  headerCenterProps?: HeaderCenterProps;
  headerLeftProps?: HeaderLeftProps;
  headerRightProps?: HeaderRightProps;
};

const EmptyLayout = (props: EmptyLayoutProps) => {
  const {
    children,
    headerShown,
    headerContainerProps,
    headerCenterProps,
    headerLeftProps,
    headerRightProps,
  } = props;

  return (
    <Section>
      {headerShown && (
        <Header.Container {...headerContainerProps}>
          <Header.Left {...headerLeftProps} />
          <Header.Center {...headerCenterProps} />
          <Header.Right {...headerRightProps} />
        </Header.Container>
      )}
      <Container>{children}</Container>
    </Section>
  );
};

export default EmptyLayout;

const Container = styled.article`
  padding: ${({theme}) => theme.size[0]} ${({theme}) => theme.size[6]}px;
  min-height: 90vh;
`;

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
