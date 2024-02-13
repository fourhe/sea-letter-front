'use client';

import * as Sentry from '@sentry/nextjs';
import {useEffect} from 'react';

import {
  BottleContainer,
  Container,
  ErrorMessage,
  ErrorMessageContainer,
  ErrorMessageTitle,
} from '@/ui/feature/error';
import {Icon} from '@components/atom';

const Error = ({error}: {error: Error & {digest?: string}}) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
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
};

export default Error;
