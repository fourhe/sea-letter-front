import styled from 'styled-components';

import type {DotProps} from './types';

const Dots = (props: DotProps) => {
  const {activeIndex, length} = props;
  return (
    <Container>
      {new Array(length).fill('').map((_, i) => (
        <Item key={activeIndex} $isActive={i === activeIndex} />
      ))}
    </Container>
  );
};

export default Dots;

const Container = styled.div`
  display: inline-flex;
  align-items: flex-start;
  gap: 12px;
`;

const Item = styled.span<{$isActive: boolean}>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  background: ${({$isActive, theme}) =>
    theme.color.primary[$isActive ? 'pointPink' : 'bgPink']};
`;
