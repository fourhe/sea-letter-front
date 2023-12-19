'use client';

import {Children, type CSSProperties, type ReactNode, useMemo} from 'react';
import styled from 'styled-components';

import {useDialog} from './hook';
import {Backdrop} from '../../atom';

type DialogContainerProps = {
  containerStyle?: CSSProperties;
  children?: ReactNode;
};

const DialogContainer = (props: DialogContainerProps) => {
  const {containerStyle, children} = props;
  const {open, handleClose} = useDialog();

  const {headerChildren, bodyChildren, footerChildren, restChildren} =
    useMemo(() => {
      const header: ReactNode[] = [];
      const body: ReactNode[] = [];
      const footer: ReactNode[] = [];
      const rest: ReactNode[] = [];
      Children.toArray(children).forEach(child => {
        switch ((child as JSX.Element)?.type?.displayName) {
          case 'DialogHeader':
            header.push(child);
            break;
          case 'DialogBody':
            body.push(child);
            break;
          case 'DialogFooter':
            footer.push(child);
            break;
          default:
            rest.push(child);
        }
      });
      return {
        headerChildren: header,
        bodyChildren: body,
        footerChildren: footer,
        restChildren: rest,
      };
    }, [children]);
  return (
    <>
      <Backdrop open={open} onClose={handleClose} />
      <Container open={open} style={containerStyle}>
        {headerChildren.length > 0 && <SideBlock> {headerChildren} </SideBlock>}
        {(bodyChildren.length > 0 || restChildren.length > 0) && (
          <div>
            {bodyChildren.length > 0 && bodyChildren}
            {restChildren.length > 0 && restChildren}
          </div>
        )}
        {footerChildren.length > 0 && <SideBlock> {footerChildren} </SideBlock>}
      </Container>
    </>
  );
};

export default DialogContainer;

const Container = styled.div<{open: boolean}>`
  width: 50vw;
  display: ${({open}) => (open ? 'flex' : 'none')};
  flex-direction: column;
  gap: ${({theme}) => theme.size[4]}px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({theme}) => theme.color.white};
  z-index: 3;
  padding: ${({theme}) => theme.size[6]}px;
  border-radius: ${({theme}) => theme.size[2]}px;
`;

const SideBlock = styled.div`
  flex-direction: row;
  min-width: ${({theme}) => theme.size[6]}px;
  min-height: ${({theme}) => theme.size[6]}px;
`;
