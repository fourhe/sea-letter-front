'use client';

import {useEffect} from 'react';

import {Icon, Link} from '@components/atom';
import {Accordion} from '@components/organism';
import {useDrawer} from '@components/organism/Drawer/hook';
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
  const {handleOpen} = useDrawer();

  return (
    <EmptyLayout
      headerShown
      headerLeftProps={{isBack: true}}
      headerCenterProps={{title: '바다로 보내는 편지'}}
      headerRightProps={{
        icon: 'HamburgerButton',
        onClick: handleOpen,
      }}>
      <Icon.HamburgerButton />
      <Link href="/about">about</Link>
      <div style={{display: 'grid', gap: 5}}>
        {accordion.map(item => (
          <Accordion.Container key={item.id}>
            <Accordion.Header>{item.title}</Accordion.Header>
            <Accordion.Body>{item.body}</Accordion.Body>
          </Accordion.Container>
        ))}
      </div>
    </EmptyLayout>
  );
};

export default Home;

const accordion = [
  {id: 1, title: 'title1', body: 'body1'},
  {id: 2, title: 'title2', body: 'body2'},
  {id: 3, title: 'title3', body: 'body3'},
];
