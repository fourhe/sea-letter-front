'use client';

import {useSetAtom} from 'jotai';
import {useEffect} from 'react';

import {Icon, Link} from '@components/atom';
import {drawerAtom} from '@components/organism/Drawer';
import {EmptyLayout} from '@components/template';

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
  const setDrawer = useSetAtom(drawerAtom);
  const openDrawer = () => setDrawer(true);
  return (
    <EmptyLayout
      headerShown
      headerLeftProps={{icon: 'Search'}}
      headerCenterProps={{title: '바다로 보내는 편지'}}
      headerRightProps={{
        icon: 'HamburgerButton',
        onClick: openDrawer,
      }}>
      <Icon.Home />
      <Link href="/about">about</Link>
    </EmptyLayout>
  );
};

export default Home;
