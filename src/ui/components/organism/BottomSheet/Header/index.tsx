import {motion} from 'framer-motion';
import styled from 'styled-components';

const Header = () => (
  <Container>
    <Bar />
  </Container>
);

export default Header;

const Container = styled(motion.div)`
  height: 48px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: relative;
  padding-top: 16px;
  padding-bottom: 4px;
`;

const Bar = styled(motion.div)`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: #d0d0d0;
  margin: auto;
`;
