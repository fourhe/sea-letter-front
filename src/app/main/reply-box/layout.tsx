'use client';

import type {ReactNode} from 'react';

import {LayoutBackGround} from '@components/atom';

type LetterBoxLayoutProps = {
  children: ReactNode;
};

const LetterBoxLayout = (props: LetterBoxLayoutProps) => {
  const {children} = props;
  return (
    <>
      <title>마음을 담다(답장함)</title>
      <LayoutBackGround>{children}</LayoutBackGround>
    </>
  );
};

export default LetterBoxLayout;
