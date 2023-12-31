import NLink, {type LinkProps as NLinkProps} from 'next/link';
import type {CSSProperties, ReactNode} from 'react';
import styled from 'styled-components';

type LinkProps = {children?: ReactNode; style?: CSSProperties} & NLinkProps;

const SLink = styled(NLink)`
  text-decoration: none;
  color: ${({theme}) => theme.color.text[700]};

  &:hover {
    color: ${({theme}) => theme.color.text[400]};
  }
` as typeof NLink;

const Link = (props: LinkProps) => {
  const {children, ...restProps} = props;
  return <SLink {...restProps}>{children}</SLink>;
};

export default Link;
