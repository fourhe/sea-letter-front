import type {Metadata} from 'next';
import type {ReactNode} from 'react';

import {Layout} from '@feature/notice/components/template';

export const metadata: Metadata = {
  title: '바다편지(공지사항)',
};

type NoticeLayoutProps = {
  children: ReactNode;
};

const NoticeLayout = (props: NoticeLayoutProps) => {
  const {children} = props;

  return <Layout> {children}</Layout>;
};

export default NoticeLayout;
