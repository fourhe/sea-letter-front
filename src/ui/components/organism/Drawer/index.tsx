'use client';

import {atom, useAtom} from 'jotai';
import type {ReactNode} from 'react';
import styled from 'styled-components';

import {Backdrop} from '@components/atom';

export const drawerAtom = atom(false);

type DrawerProps = {
  children: ReactNode;
};

const Drawer = (props: DrawerProps) => {
  const {children} = props;
  const [open, setOpen] = useAtom(drawerAtom);
  const onClose = () => setOpen(false);
  return (
    <>
      <Container className={open ? 'active' : ''}>{children}</Container>
      <Backdrop open={open} onClose={onClose} />
    </>
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
