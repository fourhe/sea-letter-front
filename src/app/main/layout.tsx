'use client';

import type {ReactNode} from 'react';

import {BackGround, Portal} from '@components/atom';
import {PortalId} from '@components/atom/Portal/portal.enum';
import {Toast} from '@components/organism';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = (props: MainLayoutProps) => {
  const {children} = props;

  return (
    <>
      <title>마음을 담다(메인)</title>
      <BackGround />
      <Portal portalId={PortalId.Toast}>
        <Toast />
      </Portal>
      {children}
    </>
  );
};

export default MainLayout;
