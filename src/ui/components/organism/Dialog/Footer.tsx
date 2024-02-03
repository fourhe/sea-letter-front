import type {CSSProperties, ReactNode} from 'react';
import styled from 'styled-components';

type FooterProps = {
  children: ReactNode;
  style?: CSSProperties;
  type?: 'horizontal' | 'vertical';
};

const Footer = (props: FooterProps) => {
  const {children, style, type = 'horizontal'} = props;
  return (
    <Container style={style} $type={type}>
      {children}
    </Container>
  );
};

export default Footer;

Footer.displayName = 'DialogFooter';

const Container = styled.footer<
  TDollarPrefix<{
    type: 'horizontal' | 'vertical';
  }>
>`
  display: flex;
  flex-direction: ${({$type}) => ($type === 'vertical' ? 'column' : 'row')};
  gap: ${({theme}) => theme.size[4]}px;
`;
