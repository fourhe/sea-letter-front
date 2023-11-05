import type {ReactNode} from 'react';

import {Header} from '@components/molecule';
import type {
  HeaderContainerProps,
  HeaderCenterProps,
  HeaderLeftProps,
  HeaderRightProps,
} from '@components/molecule/Header';

type EmptyLayoutProps = {
  children?: ReactNode;
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
    <section>
      {headerShown && (
        <Header.Container {...headerContainerProps}>
          <Header.Left {...headerLeftProps} />
          <Header.Center {...headerCenterProps} />
          <Header.Right {...headerRightProps} />
        </Header.Container>
      )}
      {children}
    </section>
  );
};

export default EmptyLayout;
