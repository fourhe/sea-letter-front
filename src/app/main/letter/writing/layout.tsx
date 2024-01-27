'use client';

import type {ReactNode} from 'react';

import {LayoutBackGround} from '@components/atom';

type WritingLayoutProps = {
  children: ReactNode;
};

const WritingLayout = (props: WritingLayoutProps) => {
  const {children} = props;
  return (
    <LayoutBackGround $color="rgba(244, 229, 225, 1)">
      {children}
    </LayoutBackGround>
  );
};

export default WritingLayout;
