'use client';

import Image from 'next/image';
import Link from 'next/link';

import {useAuthenticate} from '@application/authenticate';
import {Button} from '@components/molecule';
import {Carousel} from '@components/organism';
import Dots from '@components/organism/Carousel/Dots';
import {useCarousel} from '@components/organism/Carousel/hook';
import {EmptyLayout} from '@components/template';

const images = [
  '/image/on-boarding1.png',
  '/image/on-boarding2.png',
  '/image/on-boarding3.png',
  '/image/on-boarding4.png',
  '/image/on-boarding5.png',
];

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
        {images.map(item => (
          <Image
            priority
            width={327}
            height={650}
            fetchPriority="high"
            src={item}
            key={item}
            alt="온보딩 이미지"
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
