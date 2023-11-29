import {motion} from 'framer-motion';
import styled from 'styled-components';

const Header = () => (
  <Container>
    <Bar />
  </Container>
);

export default Header;

const Container = styled(motion.div)`
  display: flex;
  align-content: center;
  justify-content: center;
  height: 48px;
`;

const Bar = styled(motion.div)`
  width: 40px;
  height: 5px;
  border-radius: 2px;
  background: rgba(131, 101, 97, 1);
  margin: auto;
`;
