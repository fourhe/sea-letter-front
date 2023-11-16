'use client';

import {usePathname} from 'next/navigation';
import type {ReactNode} from 'react';
import {useEffect} from 'react';
import styled from 'styled-components';

import {useDrawer} from './hook';

import {Backdrop} from '@components/atom';

type DrawerProps = {
  children: ReactNode;
};

const Drawer = (props: DrawerProps) => {
  const {children} = props;
  const {open, handleClose} = useDrawer();
  const pathName = usePathname();

  useEffect(() => {
    if (pathName === '/') {
      handleClose();
    }
  }, [handleClose, pathName]);

  return (
    <>
      <Backdrop open={open} onClose={handleClose} />
      <Container open={open}>{children}</Container>
    </>
  );
};

export default Drawer;

const Container = styled.div<{open: boolean}>`
  position: fixed;
  z-index: 3;
  height: 100vh;
  width: 72vw;
  background-color: ${({theme}) => theme.color.primary.lightPink};
  left: 0;
  transform: translateX(${({open}) => (open ? 0 : -100)}%);
  transition: transform 0.3s linear;
`;
