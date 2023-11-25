'use client';

import {useForm} from 'react-hook-form';
import styled from 'styled-components';

import type {LetterForm} from '@application/ports/letter';
import {Button} from '@components/molecule';
import {EmptyLayout} from '@components/template';

const Writing = () => {
  const {register, handleSubmit} = useForm<LetterForm>();
  const onSubmit = (data: LetterForm) => {
    console.log(data);
  };

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
  height: calc(100% - 16px);
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
    line-height: normal;
  }
`;

const Content = styled.textarea`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: none;
  padding: ${({theme}) => theme.size[4]}px ${({theme}) => theme.size[2]}px;
  resize: none;

  &::placeholder {
    align-items: center;
    color: ${({theme}) => theme.color.neutral[400]};
    font-family: var(--RIDIBatang);
    font-size: ${({theme}) => theme.typography.fontSizes.lg}px;
    font-weight: ${({theme}) => theme.typography.fontWeights.normal};
    line-height: normal;
  }
`;
