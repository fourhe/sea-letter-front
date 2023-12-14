'use client';

import type {ReactNode} from 'react';
import styled from 'styled-components';

type LettersBoxLayoutProps = {
  children: ReactNode;
};

const LettersBoxLayout = (props: LettersBoxLayoutProps) => {
  const {children} = props;

  return (
    <>
      <BackGround />
      {children}
    </>
  );
};

export default LettersBoxLayout;

const BackGround = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  position: absolute;
  z-index: -1;
  background: #ffff;
`;
