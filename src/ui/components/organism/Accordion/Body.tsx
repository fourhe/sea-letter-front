import type {ComponentPropsWithRef} from 'react';
import {useContext} from 'react';
import styled from 'styled-components';

import {AccordionContext} from './Container';

type BodyProps = ComponentPropsWithRef<'div'>;

const Body = (props: BodyProps) => {
  const {open} = useContext(AccordionContext);
  return <Container open={open} {...props} />;
};

export default Body;

const Container = styled.div<{open: boolean}>`
  border-top: 1px solid #ccc;
  max-height: ${({open}) => (open ? 1000 : 0)}px;
  overflow: hidden;
  transition: max-height 0.4s ease;
`;
