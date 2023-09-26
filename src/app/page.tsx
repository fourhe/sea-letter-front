'use client';

import {useEffect} from 'react';

import {page} from './page.css';

import Button from '@components/atom/button';
import Footer from '@components/atom/Footer';
import Logo from '@components/atom/Logo';

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
    <>
      <main className={page}>
        <Logo />
        <Button>Button</Button>
      </main>
      <Footer />
    </>
  );
};

export default Home;
