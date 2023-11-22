'use client';

import {type TouchEvent, useState} from 'react';
import styled from 'styled-components';

import {Icon} from '@components/atom';
import {useDrawer} from '@components/organism/Drawer/hook';
import {EmptyLayout} from '@components/template';
import {IconButton} from '@feature/main/atom';
import {MainText} from '@feature/main/molecule';

const Main = () => {
  const {handleOpen} = useDrawer();
  const [touchStartY, setTouchStartY] = useState(0);
  const [eventOccurred, setEventOccurred] = useState(false);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) =>
    setTouchStartY(e.touches[0].clientY);

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (eventOccurred) {
      return;
    }

    const touchEndY = e.touches[0].clientY;
    const deltaY = touchEndY - touchStartY;

    if (deltaY < 0) {
      setEventOccurred(true);
    }

    setTouchStartY(touchEndY);
  };

  return (
    <EmptyLayout
      headerShown
      headerLeftProps={{
        icon: 'Hamburger',
        onClick: handleOpen,
      }}
      headerRightProps={{
        icon: 'Mail',
        text: '우편함',
      }}>
      <Container onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
        <Icon.Letter width={90} height={100} />
        <Icon.Union width={28} height={56} />
        <MainText text={'위로 올려\n편지를 주워보세요.'} />
      </Container>
      <IconButton />
    </EmptyLayout>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 35vh;
  left: 18vw;
`;
