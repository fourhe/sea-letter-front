import styled from 'styled-components';

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

type BackdropProps = {
  open?: boolean;
  onClose: () => void;
};

const Backdrop = (props: BackdropProps) => {
  const {open, onClose} = props;
  return <Container className={open ? 'active' : ''} onClick={onClose} />;
};

export default Backdrop;
