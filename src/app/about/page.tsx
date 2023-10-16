'use client';

import type {NextPage} from 'next';

import {Icon} from '@components/atom';
import {useBottomSheet} from '@components/organism/BottomSheet/hooks';

const AboutPage: NextPage = () => {
  const {setIsOpen} = useBottomSheet();
  return (
    <div>
      <input />
      <Icon.HamburgerButton onClick={() => setIsOpen(pre => !pre)} />
      about
    </div>
  );
};

export default AboutPage;
