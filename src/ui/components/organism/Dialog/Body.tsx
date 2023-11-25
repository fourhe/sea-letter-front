import type {ComponentPropsWithRef} from 'react';
import styled from 'styled-components';

type BodyProps = ComponentPropsWithRef<'main'>;

const Body = (props: BodyProps) => <Container {...props} />;
export default Body;

Body.displayName = 'DialogBody';

const Container = styled.main`
  text-align: center;
  line-height: ${({theme}) => theme.typography.lineHeights.sm}px;
`;
