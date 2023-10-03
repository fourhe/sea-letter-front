import type {CSSProperties, ReactNode} from 'react';
import styled from 'styled-components';

export type HeaderCenterProps = {
  title?: string;
  children?: ReactNode;
  style?: CSSProperties;
};

const HeaderCenter = (props: HeaderCenterProps) => {
  const {style, children, title} = props;
  return (
    <Container style={style}>
      <Text>{title}</Text>
      {children}
    </Container>
  );
};

HeaderCenter.displayName = 'HeaderCenter';

export default HeaderCenter;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.h2`
  margin: 0;
`;
