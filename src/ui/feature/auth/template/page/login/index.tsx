'use client';

import Link from 'next/link';

import {useAuthenticate} from '@application/authenticate';
import {Carousel} from '@components/organism';
import Dots from '@components/organism/Carousel/Dots';
import {useCarousel} from '@components/organism/Carousel/hook';
import {EmptyLayout} from '@components/template';

const colors = ['#f90', '#ef0', '#e0f'];

const Login = () => {
  const {index, dotLength} = useCarousel();

  const {logInFormUrl} = useAuthenticate();

  return (
    <EmptyLayout headerShown headerCenterProps={{title: '바다로 보내는 편지'}}>
      <div>
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
        <Link passHref href={logInFormUrl}>
          로그인
        </Link>
      </div>
    </EmptyLayout>
  );
};

export default Login;
