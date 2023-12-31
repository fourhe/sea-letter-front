'use client';

import type {ReactNode} from 'react';
import styled from 'styled-components';

import {useDrawer} from './hook';

import {Backdrop} from '@components/atom';

type DrawerProps = {
  children: ReactNode;
};

const Drawer = (props: DrawerProps) => {
  const {children} = props;
  const {open, handleClose} = useDrawer();

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
  width: 80vw;
  background-color: ${({theme}) => theme.color.white};
  left: 0;
  transform: translateX(${({open}) => (open ? 0 : -100)}%);
  transition: transform 0.3s linear;
`;
