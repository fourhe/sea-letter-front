import type {Metadata} from 'next';
import type {ReactNode} from 'react';

import {Layout} from '@feature/trash/components/template';

type ThrashLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: '바다편지(휴지통)',
};

const TrashLayout = (props: ThrashLayoutProps) => {
  const {children} = props;
  return <Layout>{children}</Layout>;
};

export default TrashLayout;
