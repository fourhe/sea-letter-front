'use client';

import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import styled from 'styled-components';

import {SendDialog} from '../../organism';

import {Button} from '@components/molecule';
import {useDialog} from '@components/organism/Dialog/hook';
import {EmptyLayout} from '@components/template';
import {useLetter} from '@feature/letter/hook';
import type {LetterForm} from '@services/interface/letter';

const defaultValues: LetterForm = {
  title: '',
  content: '',
};

const Writing = () => {
  const {register, handleSubmit, getValues} = useForm<LetterForm>({
    defaultValues,
  });
  const {handleOpen, handleClose} = useDialog();
  const route = useRouter();
  const {writeLetter} = useLetter();
  const onSubmit = () => handleOpen();

  return (
    <EmptyLayout
      headerShown
      headerLeftProps={{
        isBack: true,
      }}
      headerCenterProps={{
        title: '편지쓰기',
      }}
      headerRightProps={{
        children: (
          <Button color="brown" form="writing">
            보내기
          </Button>
        ),
      }}>
      <SendDialog
        title="편지를 바다로 보낼까요?"
        ok={async () => {
          const data = getValues();
          await writeLetter(data);
          handleClose();
          route.push('/main?data=writing');
        }}
      />
      <Container id="writing" onSubmit={handleSubmit(onSubmit)}>
        <Title {...register('title', {required: true})} placeholder="제목" />
        <Content
          {...register('content', {required: true})}
          placeholder="내용을 입력해 주세요."
        />
      </Container>
    </EmptyLayout>
  );
};

export default Writing;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  background: ${({theme}) => theme.color.white};
  padding: ${({theme}) => theme.size[4]}px;
  padding-bottom: ${({theme}) => theme.size[0]}px;
  border-radius: 12px 12px 0 0;
  height: 90vh;
`;

const Title = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: ${({theme}) => theme.size[4]}px ${({theme}) => theme.size[2]}px;
  border: none;
  border-bottom: 1px solid #836561;
  align-items: center;
  font-family: var(--RIDIBatang);
  font-size: ${({theme}) => theme.typography.fontSizes.lg}px;
  font-weight: ${({theme}) => theme.typography.fontWeights.normal};

  &::placeholder {
    color: ${({theme}) => theme.color.neutral[400]};
    font-family: var(--RIDIBatang);
  }
`;

const Content = styled.textarea`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: none;
  padding: ${({theme}) => theme.size[4]}px ${({theme}) => theme.size[2]}px;
  resize: none;

  align-items: center;
  font-family: var(--RIDIBatang);
  font-size: ${({theme}) => theme.typography.fontSizes.lg}px;
  font-weight: ${({theme}) => theme.typography.fontWeights.normal};
  line-height: normal;

  &::placeholder {
    color: ${({theme}) => theme.color.neutral[400]};
    font-family: var(--RIDIBatang);
    font-size: ${({theme}) => theme.typography.fontSizes.sm}px;
  }
`;
