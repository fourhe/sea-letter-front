'use client';

import {useRouter} from 'next/navigation';
import styled from 'styled-components';

import {Switch} from '@components/molecule';
import {useDrawer} from '@components/organism/Drawer/hook';
import {EmptyLayout} from '@components/template';

const Setting = () => {
  const {handleOpen} = useDrawer();
  const route = useRouter();
  const goToHome = () => route.push('/main');
  return (
    <EmptyLayout
      headerShown
      headerLeftProps={{
        icon: 'HamburgerBlack',
        onClick: handleOpen,
      }}
      headerCenterProps={{
        title: '설정',
      }}
      headerRightProps={{
        icon: 'Home',
        onClick: goToHome,
      }}>
      <Container>
        알림받기
        <Switch onClick={() => console.log(1)} />
      </Container>
      <Container>이용약관/개인정보처리방침</Container>
      <Container>불편신고 및 개선요청</Container>
      <Container>회원탈퇴</Container>
    </EmptyLayout>
  );
};

export default Setting;

const Container = styled.div`
  font-size: ${({theme}) => theme.typography.fontSizes.lg}px;
  line-height: ${({theme}) => theme.typography.lineHeights.lg}px;
  display: flex;
  padding: 18px 0;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({theme}) => theme.color.neutral[500]};
`;
