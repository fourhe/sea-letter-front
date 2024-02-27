'use client';

import styled from 'styled-components';

import {Icon, Line, Link} from '@components/atom';
import {EmptyLayout} from '@components/template';
import {useAuthenticate} from '@feature/auth/hook';

const KakaoLoginPage = () => {
  const {logInFormUrl} = useAuthenticate();
  return (
    <EmptyLayout headerShown>
      <LogoContainer>
        <Icon.Logo width={120} height={120} />
        <LogoText>바다편지</LogoText>
      </LogoContainer>
      <TextContainer>
        <LogoTitle>
          {`간편하게 로그인하고\n당신의 이야기를 바다로 보내보세요`}
        </LogoTitle>
        <LogoSubTitle>
          {`바다로 보내는 편지에 로그인하면, 이용약관과\n개인정보처리방침에 동의하는 것으로 간주합니다.`}
        </LogoSubTitle>
      </TextContainer>
      <Line type="horizontal" />
      <KakaoLoginButton href={logInFormUrl}>
        <Icon.KaKaoLogo width={20} height={20} />
        <span>카카오로 로그인하기</span>
      </KakaoLoginButton>
    </EmptyLayout>
  );
};

export default KakaoLoginPage;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 52px;
  gap: 18px;
`;

const LogoText = styled.h3`
  color: #c5bbd9;
  font-size: 30px;
  font-weight: 400;
  font-style: normal;
  font-family: var(--RIDIBatang);
`;

const LogoTitle = styled.h1`
  font-size: 20px;
  font-style: normal;
  font-weight: bold;
  line-height: 28px;
  white-space: pre-wrap;
`;

const LogoSubTitle = styled.h2`
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 22px;
  padding-bottom: 24px;
  white-space: pre-wrap;
`;

const TextContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const KakaoLoginButton = styled(Link)`
  margin-top: 40px;
  display: flex;
  padding: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background: #fee500;
  gap: 8px;

  & > span {
    color: #000;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
`;
