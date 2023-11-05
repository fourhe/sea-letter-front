import styled from 'styled-components';

const BackGround = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  position: absolute;
  z-index: -1;

  background-image: url('/image/bg-main.png');
  background-size: cover;
  background-position: center;
`;

export default BackGround;
