'use client';

import type {ReactNode} from 'react';

import {Portal} from '@components/atom';
import {PortalId} from '@components/atom/Portal/portal.enum';
import {BottomSheet, Dialog} from '@components/organism';

type AboutLayoutProps = {
  children: ReactNode;
};

const AboutLayout = (props: AboutLayoutProps) => {
  const {children} = props;
  return (
    <>
      <Portal portalId={PortalId.BottomSheet}>
        <BottomSheet>about</BottomSheet>
      </Portal>
      <Portal portalId={PortalId.Dialog}>
        <Dialog.Container>
          <Dialog.Body>답장을 보낼까요?</Dialog.Body>
          <Dialog.Footer>
            <button>아니요</button>
            <button>네, 보낼게요</button>
          </Dialog.Footer>
        </Dialog.Container>
      </Portal>
      {children}
    </>
  );
};

export default AboutLayout;
