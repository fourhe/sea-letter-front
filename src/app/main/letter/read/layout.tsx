'use client';

import {useParams, useRouter} from 'next/navigation';
import type {ReactNode} from 'react';
import {useForm} from 'react-hook-form';
import styled from 'styled-components';

import {LetterReplyForm} from '@application/ports/letter';
import {Portal} from '@components/atom';
import {PortalId} from '@components/atom/Portal/portal.enum';
import {Button} from '@components/molecule';
import {BottomSheet} from '@components/organism';
import {useBottomSheet} from '@components/organism/BottomSheet/hooks';
import {useDialog} from '@components/organism/Dialog/hook';
import {useLetter} from '@feature/letter/hook';
import {SendDialog} from '@feature/letter/writing/components/organism';

type ReadLayoutProps = {
  children: ReactNode;
};

const WritingLayout = (props: ReadLayoutProps) => {
  const {children} = props;
  const {id} = useParams<{id: string}>();
  const route = useRouter();
  const {sendReply} = useLetter();
  const {setOpen} = useBottomSheet();
  const {register, handleSubmit, getValues} = useForm<LetterReplyForm>();

  const {handleClose, handleOpen} = useDialog();
  const onSubmit = () => handleOpen();
  return (
    <>
      <BackGround />
      <SendDialog
        title="답장을 바다로 보낼까요?"
        ok={async () => {
          const data = getValues();
          await sendReply({...data, id: Number(id)});
          handleClose();
          setOpen(false);
          route.push('/main?data=reply');
        }}
      />
      <Portal portalId={PortalId.BottomSheet}>
        <BottomSheet>
          <Container id="reply" onSubmit={handleSubmit(onSubmit)}>
            <Title
              {...register('title', {required: true})}
              placeholder="제목"
            />
            <Content
              {...register('content', {required: true})}
              placeholder="내용을 입력해 주세요."
            />
          </Container>
          <Button
            form="reply"
            style={{
              fontWeight: 700,
              fontSize: 20,
            }}
            color="brown"
            size="full">
            보내기
          </Button>
        </BottomSheet>
      </Portal>
      {children}
    </>
  );
};

export default WritingLayout;

const BackGround = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  position: absolute;
  z-index: -1;
  background: #fcfaf2;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  background: ${({theme}) => theme.color.white};
  padding: ${({theme}) => theme.size[4]}px;
  padding-bottom: ${({theme}) => theme.size[0]}px;
  border-radius: 12px 12px 0 0;
  height: calc(100% - 200px);
`;

const Title = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: ${({theme}) => theme.size[4]}px ${({theme}) => theme.size[2]}px;
  border: none;
  border-bottom: 1px solid #836561;

  &::placeholder {
    align-items: center;
    color: ${({theme}) => theme.color.neutral[400]};
    font-family: var(--RIDIBatang);
    font-size: ${({theme}) => theme.typography.fontSizes.lg}px;
    font-weight: ${({theme}) => theme.typography.fontWeights.normal};
    line-height: ${({theme}) => theme.typography.lineHeights.xs}px;
  }
`;

const Content = styled.textarea`
  height: 90%;
  box-sizing: border-box;
  border: none;
  padding: ${({theme}) => theme.size[4]}px ${({theme}) => theme.size[2]}px;
  resize: none;

  &::placeholder {
    align-items: center;
    color: ${({theme}) => theme.color.neutral[400]};
    font-family: var(--RIDIBatang);
    font-size: ${({theme}) => theme.typography.fontSizes.sm}px;
    font-weight: ${({theme}) => theme.typography.fontWeights.normal};
    line-height: ${({theme}) => theme.typography.lineHeights.md}px;
  }
`;
