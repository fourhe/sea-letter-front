import type {ReactNode} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: ${({theme}) => theme.color.gray[100]};
`;

type BoxProps = {
  children: ReactNode;
};

const Box = (props: BoxProps) => {
  const {children} = props;
  return <Container>{children}</Container>;
};

export default Box;
