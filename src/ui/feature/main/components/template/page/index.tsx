'use client';

import {useQueryClient} from '@tanstack/react-query';
import {useRouter, useSearchParams} from 'next/navigation';
import {
  type TouchEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';

import {Icon} from '@components/atom';
import {useDrawer} from '@components/organism/Drawer/hook';
import {EmptyLayout} from '@components/template';
import {letterQueryKeys, useLetter} from '@feature/letter/hook';
import {IconButton} from '@feature/main/components/atom';
import {MainText} from '@feature/main/components/molecule';
import {NewUserDialog} from '@feature/main/components/organism';

const message = {
  writing: '편지가 성공적으로\n바다로 보내졌습니다.',
  reply: '답장이 성공적으로\n바다로 보내졌습니다.',
} as const;

type Message = keyof typeof message | null;

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
      }, 2500);
    }
    if (id === null && isUpEvent) {
      setTimeout(() => {
        setIsUpEvent(false);
      }, 2500);
    }
  }, [id, client, data, route, isUpEvent]);

  const openLetter = useCallback(
    () => route.push(`/main/letter/read/${id}`),
    [id, route],
  );

  const Content = useMemo(() => {
    // 메인에서 보여줘야 하는 상황
    if (data) {
      return (
        <MainText
          style={{fontWeight: 700, fontSize: 20, lineHeight: '28px'}}
          text={message[data]}
        />
      );
    }
    // 읽을 편지가 도착 했을 때
    if (id) {
      return (
        <>
          <Icon.Letter width={297} height={297} onClick={openLetter} />
          <MainText
            style={{
              position: 'absolute',
              bottom: '3.5vh',
              left: '55%',
            }}
            text={'유리병을 탭하여\n편지를 확인하세요.'}
          />
        </>
      );
    }
    // 편지가 도착하지 않았을 때
    if (isUpEvent && id === null) {
      return (
        <>
          <Icon.HideLetter
            width={74}
            height={61}
            style={{
              position: 'absolute',
              top: '-2vh',
              right: '50%',
            }}
          />
          <MainText
            style={{
              position: 'absolute',
              bottom: '-15vh',
            }}
            text={
              '아직 편지가 떠내려오지 않았어요!\n누군가 편지를 보내길 기다려 주세요:)'
            }
          />
        </>
      );
    }
    return (
      <>
        <Icon.HideLetter width={74} height={61} />
        <MainText text={'위로 올려\n편지를 주워보세요.'} />
      </>
    );
  }, [data, id, isUpEvent, openLetter]);

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
  width: 80vw;
  position: absolute;
  justify-content: center;
  display: flex;
  top: ${({$isUpEvent}) => ($isUpEvent ? 50 : 60)}%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: ${({$isUpEvent}) => ($isUpEvent ? 0 : 10)}px;
`;
