'use client';

import styled from 'styled-components';

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

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const BottleContainer = styled.div`
  color: ${({theme}) => theme.color.primary.bgPink};
  align-items: center;
  justify-content: center;
  font-size: 96px;
  font-weight: 700;
  display: inline-flex;
  gap: 10px;
`;

const ErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  margin-top: 20px;
`;

const ErrorMessageTitle = styled.h5`
  color: ${({theme}) => theme.color.neutral[600]};
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  margin-bottom: 4px;
`;
const ErrorMessage = styled.h6`
  color: ${({theme}) => theme.color.neutral[600]};
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;
