'use client';

import type {ReactNode} from 'react';

import {LayoutBackGround} from '@components/atom';

type NoticeLayoutProps = {
  children: ReactNode;
};

const NoticeLayout = (props: NoticeLayoutProps) => {
  const {children} = props;

  return (
    <>
      <title>마음을 담다(설정)</title>
      <LayoutBackGround>{children}</LayoutBackGround>
    </>
  );
};

export default NoticeLayout;
