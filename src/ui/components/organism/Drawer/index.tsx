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
    <Backdrop open={open} onClose={handleClose}>
      <Container className={open ? 'active' : ''}>{children}</Container>
    </Backdrop>
  );
};

export default Drawer;

const Container = styled.div`
  position: fixed;
  z-index: 3;
  height: 100vh;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #17141d;
  color: white;
  left: 0;
  transform: translateX(-100%);
  transition: transform 0.3s linear;

  &.active {
    transform: translateX(0);
  }
`;
