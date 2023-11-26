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
  justify-content: space-between;
  gap: ${({theme}) => theme.size[4]}px;
`;
