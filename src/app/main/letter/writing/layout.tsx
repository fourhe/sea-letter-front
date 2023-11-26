'use client';

import type {ReactNode} from 'react';
import styled from 'styled-components';

type WritingLayoutProps = {
  children: ReactNode;
};

const WritingLayout = (props: WritingLayoutProps) => {
  const {children} = props;

  return (
    <>
      <BackGround />
      {children}
    </>
  );
};

export default WritingLayout;

const BackGround = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  position: absolute;
  z-index: -1;
  background: rgba(244, 229, 225, 1);
`;
