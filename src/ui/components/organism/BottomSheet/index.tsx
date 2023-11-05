'use client';

import {motion} from 'framer-motion';
import type {ReactNode} from 'react';
import {useState} from 'react';
import styled from 'styled-components';

import Header from './Header';
import {useBottomSheet} from './hooks';

import {Backdrop} from '@components/atom';

type BottomSheetProps = {
  children: ReactNode;
};

const BottomSheet = (props: BottomSheetProps) => {
  const {children} = props;
  const {onDragEnd, controls, prevIsOpen} = useBottomSheet();
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(!prevIsOpen);

  return (
    <>
      <Backdrop open={open} onClose={onClose} />
      <Container
        drag="y"
        onAnimationStart={onClose}
        onDragEnd={onDragEnd}
        initial="hidden"
        animate={controls}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 400,
        }}
        variants={{
          visible: {y: 0},
          hidden: {y: '100%'},
        }}
        dragConstraints={{top: 0}}
        dragElastic={0.3}>
        <Header />
        <ContentContainer>{children}</ContentContainer>
      </Container>
    </>
  );
};

export default BottomSheet;

const Container = styled(motion.div)`
  position: fixed;
  z-index: 10;
  top: 5vh;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  background: white;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const ContentContainer = styled.div`
  height: 90vh;
  padding: 10px;
`;
