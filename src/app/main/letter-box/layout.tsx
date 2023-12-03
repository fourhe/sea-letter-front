'use client';

import type {ReactNode} from 'react';
import styled from 'styled-components';

type LetterBoxLayoutProps = {
  children: ReactNode;
};

const LetterBoxLayout = (props: LetterBoxLayoutProps) => {
  const {children} = props;

  return (
    <>
      <BackGround />
      {children}
    </>
  );
};

export default LetterBoxLayout;

const BackGround = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  position: absolute;
  z-index: -1;
  background: rgba(241, 212, 220, 1);
`;
