import type {CSSProperties, ReactNode} from 'react';
import {useMemo, Children} from 'react';
import styled from 'styled-components';

export type HeaderContainerProps = {
  children?: ReactNode;
  style?: CSSProperties;
};

const HeaderContainer = (props: HeaderContainerProps) => {
  const {style, children} = props;
  const {leftChildren, rightChildren, centerChildren, restChildren} =
    useMemo(() => {
      const left: ReactNode[] = [];
      const right: ReactNode[] = [];
      const center: ReactNode[] = [];
      const rest: ReactNode[] = [];
      Children.toArray(children).forEach(child => {
        switch ((child as JSX.Element)?.type?.displayName) {
          case 'HeaderLeft':
            left.push(child);
            break;
          case 'HeaderRight':
            right.push(child);
            break;
          case 'HeaderCenter':
            center.push(child);
            break;
          default:
            rest.push(child);
        }
      });
      return {
        leftChildren: left,
        rightChildren: right,
        centerChildren: center,
        restChildren: rest,
      };
    }, [children]);

  return (
    <Container style={style}>
      <SideBlock>{leftChildren.length ? leftChildren : null}</SideBlock>
      <CenterBlock>{centerChildren.length ? centerChildren : null}</CenterBlock>
      <RestBlock>{restChildren.length ? restChildren : null}</RestBlock>
      <SideBlock>{rightChildren.length ? rightChildren : null}</SideBlock>
    </Container>
  );
};

export default HeaderContainer;

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme}) => theme.size[5]}px;
`;

const SideBlock = styled.div`
  flex-direction: row;
  min-width: ${({theme}) => theme.size[8]}px;
  min-height: ${({theme}) => theme.size[8]}px;
`;

const CenterBlock = styled.div`
  flex: 1;
`;

const RestBlock = styled.div``;
