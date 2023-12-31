'use client';

import {useMemo} from 'react';
import {useForm} from 'react-hook-form';
import styled, {useTheme} from 'styled-components';

import type {User} from '@application/ports/user';
import {Button} from '@components/molecule';
import {EmptyLayout} from '@components/template';
import {useEmail} from '@feature/setting/hook';

type TEmailForm = Pick<User, 'email'>;

const defaultValues: TEmailForm = {
  email: '',
};

const Email = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<TEmailForm>({defaultValues});
  const {typography} = useTheme();

  const errorMessages = useMemo(() => {
    let baseErrorMessages =
      '편지 답장과 감사인사에 대한 알림을 받을 이메일을\n입력해주세요.';
    if (errors.email?.type === 'required') {
      return baseErrorMessages;
    }
    if (errors.email?.type === 'pattern') {
      baseErrorMessages = errors.email.message!;
    }
    return baseErrorMessages;
  }, [errors]);

  const {updateEmail} = useEmail();

  return (
    <EmptyLayout
      headerShown
      headerLeftProps={{
        isBack: true,
      }}
      headerCenterProps={{
        title: '이메일 등록/변경',
      }}>
      <EmailForm onSubmit={handleSubmit(data => updateEmail(data))} id="email">
        <div>
          <TitleContainer>
            <Title>{`알림을 받을 이메일을\n등록할 수 있어요`}</Title>
            <SubTitle>아이디로 쓰고있는 이메일은 그대로 유지돼요.</SubTitle>
          </TitleContainer>
          <EmailContainer>
            이메일
            <EmailInput
              placeholder="이메일을 입력해 주세요."
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '올바른 형식의 이메일을 입력해주세요.',
                },
              })}
            />
            <ErrorMessageBox>
              <BulletPoint $isError={!errors.email}>•</BulletPoint>
              <ErrorMessage $isError={!errors.email}>
                {errorMessages}
              </ErrorMessage>
            </ErrorMessageBox>
          </EmailContainer>
        </div>
      </EmailForm>
      <Button
        disabled={!!errors.email}
        form="email"
        size="full"
        color="pink"
        bold
        style={{
          fontSize: typography.fontSizes.lg,
        }}>
        확인
      </Button>
    </EmptyLayout>
  );
};

export default Email;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: ${({theme}) => theme.typography.fontWeights.medium};
  white-space: pre-line;
`;

const SubTitle = styled.div`
  font-size: ${({theme}) => theme.typography.fontSizes.sm}px;
  color: ${({theme}) => theme.color.neutral[500]};
`;

const EmailForm = styled.form`
  display: flex;
  flex-direction: column;
  height: calc(100% - 100px);
  justify-content: space-between;
`;

const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ErrorMessageBox = styled.li`
  display: flex;
  align-items: flex-start;
  font-size: ${({theme}) => theme.typography.fontSizes.xs}px;
`;

const BulletPoint = styled.div<{$isError: boolean}>`
  color: ${({theme, $isError}) =>
    $isError ? theme.color.neutral[500] : theme.color.primary.pointPink};
  margin: 0 0.3em;
`;

const ErrorMessage = styled.div<{$isError: boolean}>`
  white-space: pre-line;
  color: ${({theme, $isError}) =>
    $isError ? theme.color.neutral[500] : theme.color.primary.pointPink};
  line-height: ${({theme}) => theme.typography.lineHeights.xs}px;
`;

const EmailInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: ${({theme}) => theme.size[4]}px ${({theme}) => theme.size[3]}px;
  border: none;
  border-radius: 4px;
  align-items: center;
  font-size: ${({theme}) => theme.typography.fontSizes.lg}px;
  font-weight: ${({theme}) => theme.typography.fontWeights.normal};
  background-color: ${({theme}) => theme.color.neutral[100]};

  &::placeholder {
    color: ${({theme}) => theme.color.neutral[400]};
    font-size: ${({theme}) => theme.typography.fontSizes.xs}px;
  }
`;
