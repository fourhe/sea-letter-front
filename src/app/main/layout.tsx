'use client';

import type {ReactNode} from 'react';

import {BackGround} from '@components/atom';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = (props: MainLayoutProps) => {
  const {children} = props;
  return (
    <>
      <BackGround />
      {children}
    </>
  );
};

export default MainLayout;
