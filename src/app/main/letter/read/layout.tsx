import type {Metadata} from 'next';
import type {ReactNode} from 'react';

import {Layout} from '@feature/letter/read/components/template';

export const metadata: Metadata = {
  title: '바다편지(편지읽기)',
};

type ReadLayoutProps = {
  children: ReactNode;
};

const WritingLayout = (props: ReadLayoutProps) => {
  const {children} = props;
  return <Layout>{children}</Layout>;
};

export default WritingLayout;
