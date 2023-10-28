import styled, {useTheme} from 'styled-components';

import {Icon} from '@components/atom';

const IconButton = () => {
  const theme = useTheme();
  return (
    <Container>
      <Icon.Pencil
        fill={theme.color.white}
        width={theme.size.icon.large}
        height={theme.size.icon.large}
      />
    </Container>
  );
};

export default IconButton;

const Container = styled.div`
  background: ${({theme}) => theme.color.white};
  box-shadow: 0 3px 5px 0 #9d8c8c;
  border-radius: 40px;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 20px;
  bottom: 20px;
`;
