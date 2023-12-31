import {type ComponentPropsWithRef, useContext} from 'react';
import styled from 'styled-components';

import {AccordionContext} from './Container';

type BodyProps = ComponentPropsWithRef<'div'>;

const Body = (props: BodyProps) => {
  const {open} = useContext(AccordionContext);
  if (open === undefined) throw new Error('AccordionContext is not provided');
  return <Container open={open} {...props} />;
};

export default Body;

const Container = styled.div<{open: boolean}>`
  border-bottom: 1px solid ${({theme}) => theme.color.neutral[500]};
  max-height: ${({open}) => (open ? 1000 : 0)}px;
  overflow: hidden;
  transition: max-height 0.4s ease;
`;
