'use client';

import Link from 'next/link';

import {useAuthenticate} from '@application/authenticate';
import {Button} from '@components/molecule';
import {Carousel} from '@components/organism';
import Dots from '@components/organism/Carousel/Dots';
import {useCarousel} from '@components/organism/Carousel/hook';
import {EmptyLayout} from '@components/template';

const colors = ['#f90', '#ef0', '#0f9', '#ff00ae', '#90f'];

const Login = () => {
  const {index, dotLength} = useCarousel();

  const {logInFormUrl} = useAuthenticate();

  return (
    <EmptyLayout
      headerShown
      headerCenterProps={{
        children: <Dots length={dotLength} activeIndex={index} />,
      }}>
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
      <Link passHref href={logInFormUrl}>
        <Button color="pink" size="full" bold style={{fontSize: 20}}>
          시작하기
        </Button>
      </Link>
    </EmptyLayout>
  );
};

export default Login;
