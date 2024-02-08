'use client';

import {
  BottleContainer,
  Container,
  ErrorMessage,
  ErrorMessageContainer,
  ErrorMessageTitle,
} from '@/ui/feature/error';
import {Icon} from '@components/atom';

const NotFound = () => (
  <Container>
    <BottleContainer>
      4<Icon.Bottle width={66} height={140} />4
    </BottleContainer>
    <ErrorMessageContainer>
      <ErrorMessageTitle>페이지를 찾을 수 없습니다.</ErrorMessageTitle>
      <ErrorMessage>요청하신 페이지가 사라졌거나</ErrorMessage>
      <ErrorMessage>잘못된 경로를 이용하셨어요.</ErrorMessage>
    </ErrorMessageContainer>
  </Container>
);

export default NotFound;
