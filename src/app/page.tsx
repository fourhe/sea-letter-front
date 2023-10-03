'use client';

import {useEffect} from 'react';

import {Box, Icon} from '@components/atom';
import {Header} from '@components/molecule';

const Home = () => {
  useEffect(() => {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      console.log('mobile');
    } else {
      console.log('desktop');
    }
  }, []);
  return (
    <main>
      <Header.Container>
        <Header.Left icon="Search" disabled onClick={() => console.log(1)} />
        <Header.Center title="바다로 보내는 편지" />
        <Header.Right icon="HamburgerButton" />
      </Header.Container>
      <Box>hi</Box>
      <Icon.Home />
    </main>
  );
};

export default Home;
