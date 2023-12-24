import {forwardRef, type ReactNode} from 'react';
import styled from 'styled-components';

type ContainerProps = {
  children: ReactNode;
};

const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const {children} = props;
  return <SContainer ref={ref}>{children}</SContainer>;
});

Container.displayName = 'CarouselContainer';

export default Container;

const SContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;
