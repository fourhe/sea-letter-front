import styled from 'styled-components';

import type {DotProps} from './types';

const Dots = (props: DotProps) => {
  const {activeIndex, length} = props;
  return (
    <Container>
      {new Array(length).fill('').map((_, i) => (
        <Item
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          $isActive={i === activeIndex}
        />
      ))}
    </Container>
  );
};

export default Dots;

const Container = styled.div`
  padding: 10px 0;
  justify-content: center;
  display: flex;
`;

const Item = styled.span<{$isActive: boolean}>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin: 0 10px;
  display: inline-block;
  cursor: pointer;
  background: ${({$isActive}) => ($isActive ? '#000' : '#999')};
  transform: ${({$isActive}) => ($isActive ? 'scale(1.3)' : 'scale(1)')};
`;
