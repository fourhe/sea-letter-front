import {motion} from 'framer-motion';
import styled from 'styled-components';

import type {SliderProps} from './types';

const Slider = (props: SliderProps) => {
  const {children, x, onDragEnd, totalSliders} = props;
  return (
    <Container
      style={{x}}
      drag={totalSliders > 1 && 'x'}
      dragElastic={0.3}
      onDragEnd={onDragEnd}>
      {children}
    </Container>
  );
};

export default Slider;

const Container = styled(motion.div)`
  flex: none;
  width: 100%;
  display: inline-block;
`;
