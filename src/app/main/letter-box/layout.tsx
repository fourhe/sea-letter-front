import type {Metadata} from 'next';
import type {ReactNode} from 'react';

import {Layout} from '@feature/letterBox/components/template';

type LetterBoxLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: '바다편지(우편함)',
};

const LetterBoxLayout = (props: LetterBoxLayoutProps) => {
  const {children} = props;
  return <Layout>{children}</Layout>;
};

export default LetterBoxLayout;
