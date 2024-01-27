import styled from 'styled-components';

const BackGround = styled.div<{
  $color?: string;
}>`
  background: ${({theme, $color}) => $color || theme.color.primary.lightPink};
`;

export default BackGround;
