import type {ReactNode} from 'react';

type LoginLayoutProps = {
  children: ReactNode;
};

const LoginLayout = (props: LoginLayoutProps) => {
  const {children} = props;
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default LoginLayout;
