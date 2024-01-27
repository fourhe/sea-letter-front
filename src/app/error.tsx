'use client';

import styled from 'styled-components';

import {Icon} from '@components/atom';

const Error = () => (
  <Container>
    <BottleContainer>
      <Icon.ErrorBottle width={150} height={100} />
    </BottleContainer>
    <ErrorMessageContainer>
      <ErrorMessageTitle>잠시후 다시 확인해주세요.</ErrorMessageTitle>
      <ErrorMessage>지금 이 페이지를 표시 할 수 없습니다.</ErrorMessage>
      <ErrorMessage>문제를 해결하기 위해 노력하고 있습니다.</ErrorMessage>
      <ErrorMessage>잠시 후 다시 확인해 주세요!</ErrorMessage>
    </ErrorMessageContainer>
  </Container>
);

export default Error;

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
