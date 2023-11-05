import type {CSSProperties, ReactNode} from 'react';
import styled from 'styled-components';

type FooterProps = {children: ReactNode; style?: CSSProperties};

const Footer = (props: FooterProps) => {
  const {children, style} = props;
  return <Container style={style}>{children}</Container>;
};

export default Footer;

Footer.displayName = 'DialogFooter';

const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({theme}) => theme.size[2]}px;
`;
