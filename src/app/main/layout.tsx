'use client';

import type {ReactNode} from 'react';

import {Portal} from '@components/atom';
import {PortalId} from '@components/atom/Portal/portal.enum';
import {BottomSheet} from '@components/organism';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = (props: MainLayoutProps) => {
  const {children} = props;
  return (
    <>
      <Portal portalId={PortalId.BottomSheet}>
        <BottomSheet>main</BottomSheet>
      </Portal>
      {children}
    </>
  );
};

export default MainLayout;
