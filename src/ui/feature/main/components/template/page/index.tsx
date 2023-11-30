'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {type TouchEvent, useCallback, useMemo, useState} from 'react';
import styled from 'styled-components';

import {Icon} from '@components/atom';
import {useDrawer} from '@components/organism/Drawer/hook';
import {EmptyLayout} from '@components/template';
import {useLetter} from '@feature/letter/hook';
import {IconButton} from '@feature/main/components/atom';
import {MainText} from '@feature/main/components/molecule';

const message = {
  writing: '편지가 성공적으로\n바다로 보내졌습니다.',
  reply: '답장이 성공적으로\n바다로 보내졌습니다.',
  review: '리뷰가 등록되었어요.\n소중한 의견 감사합니다.',
} as const;

type Message = keyof typeof message | null;

const Main = () => {
  const {handleOpen} = useDrawer();
  const [touchStartY, setTouchStartY] = useState(0);
  const [isUpEvent, setIsUpEvent] = useState(false);
  const route = useRouter();
  const {id} = useLetter({isUpEvent});
  const {get} = useSearchParams();
  const data = get('data') as Message;

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (isUpEvent) return;
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (isUpEvent) return;
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchEndY - touchStartY;
    if (deltaY < 0) {
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
      // eslint-disable-next-line no-nested-ternary
      data ? (
        <MainText
          style={{fontWeight: 700, fontSize: 20, lineHeight: '28px'}}
          text={message[data]}
        />
      ) : isUpEvent ? (
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
    [data, isUpEvent, openLetter],
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
