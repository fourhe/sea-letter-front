import type {ReactNode} from 'react';
import styled from 'styled-components';

type BackdropProps = {
  open?: boolean;
  onClose: () => void;
  children?: ReactNode;
};

const Backdrop = (props: BackdropProps) => {
  const {open, onClose, children} = props;
  return (
    <Container className={open ? 'active' : ''} onClick={onClose}>
      {children}
    </Container>
  );
};

export default Backdrop;

const Container = styled.div`
  height: 100vh;
  transition: 0.3s linear;
  position: absolute;
  z-index: 2;

  &.active {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;
