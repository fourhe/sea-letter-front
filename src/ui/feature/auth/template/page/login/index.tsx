'use client';

import Link from 'next/link';
import styled from 'styled-components';

import {Carousel} from '@components/organism';
import Dots from '@components/organism/Carousel/Dots';
import {useCarousel} from '@components/organism/Carousel/hook';
import {EmptyLayout} from '@components/template';

const colors = ['#f90', '#ef0', '#e0f'];

const Login = () => {
  const {index, dotLength} = useCarousel();

  return (
    <EmptyLayout headerShown headerCenterProps={{title: '바다로 보내는 편지'}}>
      <CarouselContainer>
        <Carousel>
          {colors.map(item => (
            <div
              key={item}
              style={{
                height: 600,
                backgroundColor: item,
              }}
            />
          ))}
        </Carousel>
        <Dots length={dotLength} activeIndex={index} />
        <Link
          passHref
          href="http://letter2sea-be-prod-env.ap-northeast-2.elasticbeanstalk.com/login/form">
          로그인
        </Link>
      </CarouselContainer>
    </EmptyLayout>
  );
};

export default Login;

const CarouselContainer = styled.div`
  padding: 0 20px;
  margin: 0 auto;
  width: 90vw;
  height: 100%;
`;
