'use client';

import localFont from 'next/font/local';
import {useRouter} from 'next/navigation';
import type {ReactNode} from 'react';
import styled from 'styled-components';

import Providers from '@/ui/providers';
import {Icon} from '@components/atom';
import {PortalId} from '@components/atom/Portal/portal.enum';
import {Button} from '@components/molecule';
import {Drawer} from '@components/organism';
import AuthenticationService from '@services/auth';

import '@/ui/styles/index.css';

const Pretendard = localFont({
  src: '../../public/font/PretendardVariable.woff2',
});

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({children}: RootLayoutProps) => {
  const route = useRouter();

  const logout = async () => {
    await new AuthenticationService().logOut();
    route.push('/');
  };

  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>마음을 담다</title>
      </head>
      <body className={Pretendard.className}>
        <Providers>
          <Drawer>
            <Container>
              <SettingContainer>
                <Icon.Settings height={24} width={24} fill="none" />
              </SettingContainer>
              <TextContainer>
                <h2 style={{margin: '0 auto'}}>안녕하세요!</h2>
                <h2 style={{margin: '0 auto'}}>소라게님</h2>
              </TextContainer>
              <Button
                size="normal"
                color="rgba(183, 82, 114, 1)"
                bold
                onClick={logout}>
                로그아웃
              </Button>
              <MusicContainer>
                <Ul>
                  <li>공지사항</li>
                  <li>공유하기</li>
                  <li>리뷰와 별점주기</li>
                </Ul>
              </MusicContainer>
              <TrashContainer>
                <p>휴지통</p>
                <p>0</p>
              </TrashContainer>
            </Container>
          </Drawer>
          <div id={PortalId.BottomSheet} />
          <div id={PortalId.Dialog} />
          <div id={PortalId.Toast} />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;

const Container = styled.div`
  height: 100vh;
  padding: 18px;
`;

const SettingContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 15vh;
  gap: 5px;
`;

const MusicContainer = styled.div`
  border-top: 2px solid;
  border-bottom: 2px solid;
  margin-top: 20px;
  height: 65%;
`;
const Ul = styled.ul`
  padding: 20px 10px;
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const TrashContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 100%;
`;
