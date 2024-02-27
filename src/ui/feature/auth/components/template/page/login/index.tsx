'use client';

import {useRouter} from 'next/navigation';
import styled from 'styled-components';

import {
  OnBoarding1,
  OnBoarding2,
  OnBoarding3,
  OnBoarding4,
  OnBoarding5,
} from '@assets/svgs';
import {Button} from '@components/molecule';
import {Carousel} from '@components/organism';
import Dots from '@components/organism/Carousel/Dots';
import {useCarousel} from '@components/organism/Carousel/hook';
import {EmptyLayout} from '@components/template';

const OnBoardings = [
  {
    title: '바다편지',
    subtitle:
      '나의 마음을 담은 편지를 유리병에 넣어 바다로 보내면 누군가 편지를 주워 답장을 해주는 상상을 해본적 있나요?',
    subtitle2: '바다편지는 이 상상을 \n현실로 만들어주는 서비스 입니다.',
    Image: OnBoarding1,
  },
  {
    title: '당신의 고민과 생각을 담은 편지를 바다로 보내보세요',
    subtitle:
      '편지를 써서 바다로 보내세요. 누군가 당신의 편지를 줍는다면 답장을 해줄거에요.',
    Image: OnBoarding2,
  },
  {
    title: '다른 사람이 보낸 편지에 \n답장을 할 수 있어요',
    subtitle:
      '바다에서 다른 이의 편지를 주워 답장을 해보세요. 누군가 당신의 답장을 기다리고 있어요.',
    Image: OnBoarding3,
  },
  {
    title: '답장을 받는 다면 \n감사 인사를 전해주세요',
    subtitle: '당신의 편지에 답장을 해준 누군가에게 감사 인사를 전해주세요.',
    Image: OnBoarding4,
  },
  {
    title: '모든 편지는 \n익명으로 주고 받아요',
    subtitle:
      '바다편지는 편지를 보내는 사람도 받는 사람도 알 수 없어요. 때문에 특정 사람과 지속해서 메세지를 주고 받을 수 없답니다.',
    Image: OnBoarding5,
  },
];

const Login = () => {
  const {index, dotLength} = useCarousel();
  const route = useRouter();

  const goToKakaoLogin = () => route.push('/auth/login/kakao');

  return (
    <EmptyLayout
      headerShown
      headerCenterProps={{
        children: <Dots length={dotLength} activeIndex={index} />,
      }}>
      <Carousel>
        {OnBoardings.map((OnBoarding, i) => (
          <ImageContainer key={OnBoarding.title}>
            {i === 0 && <OnBoarding.Image />}
            {i === 0 ? (
              <LogoTitle>{OnBoarding.title}</LogoTitle>
            ) : (
              <Title>{OnBoarding.title}</Title>
            )}
            <SubTitle>{OnBoarding.subtitle}</SubTitle>
            {!!OnBoarding?.subtitle2 && (
              <SubTitle>{OnBoarding?.subtitle2}</SubTitle>
            )}
            {i !== 0 && <OnBoarding.Image />}
          </ImageContainer>
        ))}
      </Carousel>
      <Button
        color="pink"
        size="full"
        bold
        style={{fontSize: 20}}
        onClick={goToKakaoLogin}>
        시작하기
      </Button>
    </EmptyLayout>
  );
};

export default Login;

const ImageContainer = styled.div`
  //background-color: red;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoTitle = styled.h1`
  font-family: var(--RIDIBatang);
  color: rgba(197, 187, 217, 1);
  font-size: 40px;
  font-weight: 400;
  line-height: 48px;
  margin: 20px 0 40px;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: bold;
  line-height: 32px;
  margin-bottom: 20px;
`;

const SubTitle = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 26px;
  margin-bottom: 40px;
  white-space: pre-line;
  width: 100%;
`;
