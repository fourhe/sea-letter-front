'use client';

import Image from 'next/image';
import styled from 'styled-components';

const Loading = () => (
  <Container>
    <Image src="/loading.png" alt="loading" width={185} height={185} />
    <LoadingMessageContainer>
      <LoadingMessageTitle>잠시만 기다려 주세요.</LoadingMessageTitle>
      <LoadingMessage>해당 페이지로 이동 중입니다.</LoadingMessage>
    </LoadingMessageContainer>
  </Container>
);

export default Loading;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  background-color: ${({theme}) => theme.color.white};
`;

const LoadingMessageContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  margin-top: 20px;
`;

const LoadingMessageTitle = styled.h5`
  color: ${({theme}) => theme.color.neutral[600]};
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  margin-bottom: 4px;
`;
const LoadingMessage = styled.h6`
  color: ${({theme}) => theme.color.neutral[600]};
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;
