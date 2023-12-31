'use client';

import {useForm, useWatch} from 'react-hook-form';
import {useTheme} from 'styled-components';

import * as S from './style';

import type {User} from '@application/ports/user';
import {Button} from '@components/molecule';
import {EmptyLayout} from '@components/template';
import {useEmail} from '@feature/setting/hook';

type TEmailForm = Pick<User, 'email'>;

const defaultValues: TEmailForm = {
  email: '',
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Email = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<TEmailForm>({defaultValues});
  const {typography} = useTheme();

  const {updateEmail} = useEmail();

  const emailValue = useWatch({
    control,
    name: 'email',
    defaultValue: defaultValues.email,
  });

  const disabled = emailRegex.test(emailValue);

  const onSubmit = (data: TEmailForm) => updateEmail(data);

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
            {...register('email', {
              required:
                '편지 답장과 감사인사에 대한 알림을 받을 이메일을\n입력해주세요.',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '올바른 형식의 이메일을 입력해주세요.',
              },
            })}
          />
          <S.ErrorMessageBox>
            <S.BulletPoint $isError={!disabled || !errors.email}>
              •
            </S.BulletPoint>
            <S.ErrorMessage $isError={!disabled || !errors.email}>
              {errors?.email?.message ||
                '편지 답장과 감사인사에 대한 알림을 받을 이메일을\n입력해주세요.'}
            </S.ErrorMessage>
          </S.ErrorMessageBox>
        </S.EmailContainer>
      </S.EmailForm>
      <Button
        disabled={!disabled}
        form="email"
        size="full"
        color="pink"
        bold
        style={{
          fontSize: typography.fontSizes.lg,
        }}>
        저장하기
      </Button>
    </EmptyLayout>
  );
};

export default Email;
