'use client';

import type {ReactNode} from 'react';
import styled from 'styled-components';

type ReadLayoutProps = {
  children: ReactNode;
};

const WritingLayout = (props: ReadLayoutProps) => {
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
  background: #fcfaf2;
`;
