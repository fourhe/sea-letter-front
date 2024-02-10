'use client';

import type {ReactNode} from 'react';

import {LayoutBackGround} from '@components/atom';

type ThrashLayoutProps = {
  children: ReactNode;
};

const TrashLayout = (props: ThrashLayoutProps) => {
  const {children} = props;
  return (
    <>
      <title>마음을 담다(휴지통)</title>
      <LayoutBackGround>{children}</LayoutBackGround>
    </>
  );
};

export default TrashLayout;
