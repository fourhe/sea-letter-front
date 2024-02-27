'use client';

import type {ReactNode} from 'react';

import {LayoutBackGround} from '@components/atom';

type LetterBoxLayoutProps = {
  children: ReactNode;
};

const LetterBoxLayout = (props: LetterBoxLayoutProps) => {
  const {children} = props;
  return <LayoutBackGround>{children}</LayoutBackGround>;
};

export default LetterBoxLayout;
