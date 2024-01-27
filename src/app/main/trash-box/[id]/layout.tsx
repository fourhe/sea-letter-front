'use client';

import type {ReactNode} from 'react';

import {LayoutBackGround} from '@components/atom';

type LettersBoxLayoutProps = {
  children: ReactNode;
};

const LettersBoxLayout = (props: LettersBoxLayoutProps) => {
  const {children} = props;
  return <LayoutBackGround $color="white">{children}</LayoutBackGround>;
};

export default LettersBoxLayout;
