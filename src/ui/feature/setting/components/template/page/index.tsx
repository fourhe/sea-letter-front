'use client';

import {useRouter} from 'next/navigation';
import styled, {useTheme} from 'styled-components';

import {Icon} from '@components/atom';
import {Switch} from '@components/molecule';
import {useDrawer} from '@components/organism/Drawer/hook';
import {EmptyLayout} from '@components/template';

const Setting = () => {
  const {handleOpen} = useDrawer();
  const route = useRouter();
  const goToHome = () => route.push('/main');

  const {color, size} = useTheme();

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
        <div>
          <Title>알림 설정</Title>
          <Content
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}>
            <AlarmContainer>
              알림 받기 <Switch onClick={() => console.log(1)} />
            </AlarmContainer>
            <SubContent>
              {`편지 답장과 감사인사에 대한 알림을\n이메일로 받을 수 있어요`}
            </SubContent>
          </Content>
          <Content>
            이메일 등록/변경
            <Icon.ChevronRight
              width={size.icon.normal}
              height={size.icon.normal}
              fill={color.black}
            />
          </Content>
        </div>
        <div>
          <Title>기타 설정</Title>
          <Content>
            이용약관/개인정보처리방침
            <Icon.ChevronRight
              width={size.icon.normal}
              height={size.icon.normal}
              fill={color.black}
            />
          </Content>
          <Content>
            불편신고 및 개선요청
            <Icon.ChevronRight
              width={size.icon.normal}
              height={size.icon.normal}
              fill={color.black}
            />
          </Content>
          <Content>회원탈퇴</Content>
        </div>
      </Container>
    </EmptyLayout>
  );
};

export default Setting;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const AlarmContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  padding: 16px 0;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(67, 67, 67, 0.5);
  color: ${({theme}) => theme.color.yellowGray[700]};
  font-size: ${({theme}) => theme.typography.fontSizes.lg}px;
  font-weight: ${({theme}) => theme.typography.fontWeights.normal};
  line-height: ${({theme}) => theme.typography.lineHeights.lg}px;
  gap: 12px;
`;

const SubContent = styled.div`
  color: ${({theme}) => theme.color.neutral[500]};
  white-space: pre-wrap;
  font-size: ${({theme}) => theme.typography.fontSizes.xs}px;
  line-height: ${({theme}) => theme.typography.lineHeights.xs}px;
`;

const Title = styled.div`
  padding: 8px 0;
  color: ${({theme}) => theme.color.neutral[800]};

  font-size: ${({theme}) => theme.typography.fontSizes.sm}px;
  font-weight: ${({theme}) => theme.typography.fontWeights.bold};
  line-height: ${({theme}) => theme.typography.lineHeights.sm}px;
  border-bottom: 2px solid ${({theme}) => theme.color.neutral[800]};
`;
