'use client';

import type {ReactNode} from 'react';
import {useTheme} from 'styled-components';

import {LayoutBackGround} from '@components/atom';

type LettersBoxLayoutProps = {
  children: ReactNode;
};

const LettersBoxLayout = (props: LettersBoxLayoutProps) => {
  const {children} = props;
  const {color} = useTheme();
  return (
    <LayoutBackGround $color={color.secondary.beige}>
      {children}
    </LayoutBackGround>
  );
};

export default LettersBoxLayout;
