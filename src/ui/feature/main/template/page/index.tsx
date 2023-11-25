'use client';

import {useRouter} from 'next/navigation';
import {type TouchEvent, useCallback, useMemo, useState} from 'react';
import styled from 'styled-components';

import {Icon} from '@components/atom';
import {useDrawer} from '@components/organism/Drawer/hook';
import {EmptyLayout} from '@components/template';
import {useLetter} from '@feature/letter/hook';
import {IconButton} from '@feature/main/atom';
import {MainText} from '@feature/main/molecule';

const Main = () => {
  const {handleOpen} = useDrawer();
  const [touchStartY, setTouchStartY] = useState(0);
  const [isUpEvent, setIsUpEvent] = useState(false);
  const route = useRouter();
  const {id} = useLetter({isUpEvent});
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (isUpEvent) return;
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (isUpEvent) return;
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchEndY - touchStartY;
    if (deltaY < 0) {
      console.log(id);
      setTouchStartY(0);
      setIsUpEvent(true);
    }
    setTouchStartY(touchEndY);
  };

  const openLetter = useCallback(() => {
    route.push(`/main/letter/read/${id}`);
  }, [id, route]);

  const Content = useMemo(
    () =>
      isUpEvent ? (
        <>
          <Icon.Letter width={149} height={183} onClick={openLetter} />
          <MainText
            style={{
              position: 'absolute',
              bottom: '-8vh',
              left: '50%',
            }}
            text={'유리병을 탭하여\n편지를 확인하세요.'}
          />
        </>
      ) : (
        <>
          <Icon.HideLetter width={74} height={61} />
          <Icon.Union width={28} height={56} />
          <MainText text={'위로 올려\n편지를 주워보세요.'} />
        </>
      ),
    [isUpEvent, openLetter],
  );

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
      <Container
        $isUpEvent={isUpEvent}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}>
        {Content}
      </Container>
      <IconButton />
    </EmptyLayout>
  );
};

export default Main;

const Container = styled.div<{
  $isUpEvent: boolean;
}>`
  width: 297px;
  position: absolute;
  justify-content: center;
  display: flex;
  top: ${({$isUpEvent}) => ($isUpEvent ? 50 : 60)}%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: ${({$isUpEvent}) => ($isUpEvent ? 0 : 10)}px;
`;
