import {useRouter} from 'next/navigation';
import styled, {useTheme} from 'styled-components';

import {Icon} from '@components/atom';

const IconButton = () => {
  const theme = useTheme();
  const router = useRouter();

  const goWriting = () => router.push('/main/letter/writing');

  return (
    <Container onClick={goWriting}>
      <Circle>
        <Icon.Pencil
          fill={theme.color.white}
          width={theme.size.icon.large}
          height={theme.size.icon.large}
        />
      </Circle>
      편지 쓰기
    </Container>
  );
};

export default IconButton;

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({theme}) => theme.color.white};
  box-shadow: 0 3px 5px 0 #9d8c8c;
  border-radius: 40px;
  width: 70px;
  height: 70px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  right: 20px;
  bottom: 20px;
  color: ${({theme}) => theme.color.white};
  font-size: ${({theme}) => theme.typography.fontSizes.xs}px;
  line-height: ${({theme}) => theme.typography.lineHeights.xs}px;
`;
