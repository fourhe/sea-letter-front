import type {ReactNode} from 'react';

import {Header} from '@components/molecule';
import type {
  HeaderContainerProps,
  HeaderCenterProps,
  HeaderLeftProps,
  HeaderRightProps,
} from '@components/molecule/Header';

export type EmptyLayoutProps = {
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
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Header.Container {...headerContainerProps}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Header.Left {...headerLeftProps} />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Header.Center {...headerCenterProps} />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Header.Right {...headerRightProps} />
        </Header.Container>
      )}
      {children}
    </section>
  );
};

export default EmptyLayout;
