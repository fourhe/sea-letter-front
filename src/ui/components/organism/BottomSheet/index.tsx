'use client';

import {motion} from 'framer-motion';
import type {ReactNode} from 'react';
import styled from 'styled-components';

import {useBottomSheet} from './hooks';

type BottomSheetProps = {
  children: ReactNode;
};

const BottomSheet = (props: BottomSheetProps) => {
  const {children} = props;
  const {onDragEnd, controls} = useBottomSheet();
  return (
    <Wrapper
      drag="y"
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
      dragElastic={0.2}>
      <HeaderWrapper>
        <HandleBar />
      </HeaderWrapper>
      <ContentWrapper>{children}</ContentWrapper>
    </Wrapper>
  );
};

export default BottomSheet;

const Wrapper = styled(motion.div)`
  flex-direction: column;
  position: fixed;
  z-index: 10;
  top: 20vh;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const HeaderWrapper = styled(motion.div)`
  height: 48px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: relative;
  padding-top: 16px;
  padding-bottom: 4px;
`;

const HandleBar = styled(motion.div)`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: #d0d0d0;
  margin: auto;
`;

const ContentWrapper = styled.div`
  height: 80vh;
  padding: 10px;
`;
