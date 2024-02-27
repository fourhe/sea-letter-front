import type {Metadata} from 'next';
import type {ReactNode} from 'react';

import {Layout} from '@feature/letter/writing/components/template';

type WritingLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: '바다편지(편지쓰기)',
};

const WritingLayout = (props: WritingLayoutProps) => {
  const {children} = props;
  return <Layout>{children}</Layout>;
};

export default WritingLayout;
