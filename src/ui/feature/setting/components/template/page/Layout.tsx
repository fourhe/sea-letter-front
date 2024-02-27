'use client';

import type {ReactNode} from 'react';

import {LayoutBackGround} from '@components/atom';

type NoticeLayoutProps = {
  children: ReactNode;
};

const NoticeLayout = (props: NoticeLayoutProps) => {
  const {children} = props;

  return <LayoutBackGround>{children}</LayoutBackGround>;
};

export default NoticeLayout;
