import type {Metadata} from 'next';
import type {ReactNode} from 'react';

export const metadata: Metadata = {
  title: '바다편지(온보딩)',
};

type LoginLayoutProps = {
  children: ReactNode;
};

const LoginLayout = (props: LoginLayoutProps) => {
  const {children} = props;
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default LoginLayout;
