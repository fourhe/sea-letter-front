'use client';

import {QueryObserver, useQueryClient} from '@tanstack/react-query';
import {useEffect, useMemo, useState} from 'react';
import {useForm, useWatch} from 'react-hook-form';
import styled from 'styled-components';

import * as S from './style';

import {Button} from '@components/molecule';
import {EmptyLayout} from '@components/template';
import {useEmail} from '@feature/setting/hook';
import type {MenuInfo, User} from '@services/interface/user';

type TEmailForm = Pick<User, 'emailAddress'>;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Email = () => {
  const client = useQueryClient();
  const defaultValues: TEmailForm = useMemo(
    () => ({
      emailAddress:
        client.getQueryData<MenuInfo>(['menuInfo'])?.emailAddress || '',
    }),
    [client],
  );
  const {
    control,
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<TEmailForm>({defaultValues});

  const {updateEmail} = useEmail();

  const emailValue = useWatch({
    control,
    name: 'emailAddress',
    defaultValue: defaultValues.emailAddress,
  });

  const disabled = emailRegex.test(emailValue || '');
  const [observer] = useState(
    () =>
      new QueryObserver<MenuInfo>(client, {
        queryKey: ['menuInfo'],
      }),
  );

  useEffect(() => {
    const unsubscribe = observer.subscribe(({data}) => {
      setValue('emailAddress', data?.emailAddress || null);
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: TEmailForm) => {
    updateEmail({
      ...data,
      notificationEnabled: true,
    });
  };

  return (
    <EmptyLayout
      headerShown
      headerLeftProps={{
        isBack: true,
      }}
      headerCenterProps={{
        title: '이메일 등록/변경',
      }}>
      <S.EmailForm onSubmit={handleSubmit(onSubmit)} id="email">
        <S.TitleContainer>
          <S.Title>{`알림을 받을 이메일을\n등록할 수 있어요`}</S.Title>
          <S.SubTitle>아이디로 쓰고있는 이메일은 그대로 유지돼요.</S.SubTitle>
        </S.TitleContainer>
        <S.EmailContainer>
          이메일
          <S.EmailInput
            placeholder="이메일을 입력해 주세요."
            {...register('emailAddress', {
              required:
                '편지 답장과 감사인사에 대한 알림을 받을 이메일을\n입력해주세요.',
              pattern: {
                value: emailRegex,
                message: '올바른 형식의 이메일을 입력해주세요.',
              },
            })}
          />
          <S.ErrorMessageBox>
            <S.BulletPoint $isError={!disabled || !errors.emailAddress}>
              •
            </S.BulletPoint>
            <S.ErrorMessage $isError={!disabled || !errors.emailAddress}>
              {errors?.emailAddress?.message ||
                '편지 답장과 감사인사에 대한 알림을 받을 이메일을\n입력해주세요.'}
            </S.ErrorMessage>
          </S.ErrorMessageBox>
        </S.EmailContainer>
      </S.EmailForm>
      <SaveButton
        disabled={!disabled}
        form="email"
        size="full"
        color="pink"
        bold>
        저장하기
      </SaveButton>
    </EmptyLayout>
  );
};

export default Email;

const SaveButton = styled(Button)`
  font-size: ${({theme}) => theme.typography.fontSizes.lg}px;
`;
