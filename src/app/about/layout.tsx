'use client';

import type {ReactNode} from 'react';

import {Portal} from '@components/atom';
import {PortalId} from '@components/atom/Portal/portal.enum';
import {BottomSheet} from '@components/organism';

type AboutLayoutProps = {
  children: ReactNode;
};

const AboutLayout = (props: AboutLayoutProps) => {
  const {children} = props;
  return (
    <>
      <Portal portalId={PortalId.BottomSheet}>
        <BottomSheet>
          <input />
        </BottomSheet>
      </Portal>
      {children}
    </>
  );
};

export default AboutLayout;
