'use client';

import {useQueryClient} from '@tanstack/react-query';
import {useRouter, useSearchParams} from 'next/navigation';
import {type TouchEvent, useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';

import {useDrawer} from '@components/organism/Drawer/hook';
import {EmptyLayout} from '@components/template';
import {letterQueryKeys, useLetter} from '@feature/letter/hook';
import {IconButton} from '@feature/main/components/atom';
import {Content, NewUserDialog} from '@feature/main/components/organism';

export const message = {
  writing: '편지가 성공적으로\n바다로 보내졌습니다.',
  reply: '답장이 성공적으로\n바다로 보내졌습니다.',
} as const;

export type Message = keyof typeof message | null;

const Time = 2000;

const Main = () => {
  const {handleOpen} = useDrawer();
  const [touchStartY, setTouchStartY] = useState(0);
  const [isUpEvent, setIsUpEvent] = useState(false);
  const route = useRouter();
  const client = useQueryClient();
  const {id} = useLetter({isUpEvent});
  const {get} = useSearchParams();
  const data = get('data') as Message;

  const handleTouchStart = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      if (isUpEvent) return;
      setTouchStartY(e.touches[0].clientY);
    },
    [isUpEvent],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      if (isUpEvent) return;
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchEndY - touchStartY;
      if (deltaY < 0) {
        setTouchStartY(0);
        setIsUpEvent(true);
      }
      setTouchStartY(touchEndY);
    },
    [isUpEvent, touchStartY],
  );

  useEffect(() => {
    if (data || (id && !isUpEvent)) {
      setTimeout(() => {
        route.replace('/main');
        client.setQueryData(letterQueryKeys._def, null);
      }, Time);
    }
    if (id === null && isUpEvent) {
      setTimeout(() => {
        setIsUpEvent(false);
      }, Time);
    }
  }, [id, client, data, route, isUpEvent]);

  const openLetter = useCallback(
    () => route.push(`/main/letter/read/${id}`),
    [id, route],
  );

  const goMailBox = useCallback(() => route.push('/main/letter-box'), [route]);

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
        onClick: goMailBox,
      }}>
      <NewUserDialog />
      <Container
        $isUpEvent={isUpEvent}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}>
        <Content
          message={data ? message[data] : null}
          id={id}
          isUpEvent={isUpEvent}
          openLetter={openLetter}
        />
      </Container>
      <IconButton />
    </EmptyLayout>
  );
};

export default Main;

const Container = styled.div<
  TDollarPrefix<{
    isUpEvent: boolean;
  }>
>`
  width: 80vw;
  position: absolute;
  justify-content: center;
  display: flex;
  top: ${({$isUpEvent}) => ($isUpEvent ? 50 : 60)}%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: ${({$isUpEvent}) => ($isUpEvent ? 0 : 10)}px;
`;
