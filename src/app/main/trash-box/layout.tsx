'use client';

import type {ReactNode} from 'react';

import {LayoutBackGround} from '@components/atom';

type ThrashLayoutProps = {
  children: ReactNode;
};

const TrashLayout = (props: ThrashLayoutProps) => {
  const {children} = props;
  return <LayoutBackGround>{children}</LayoutBackGround>;
};

export default TrashLayout;
