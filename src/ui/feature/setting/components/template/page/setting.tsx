'use client';

import {QueryObserver, useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {useCallback, useEffect, useState} from 'react';
import styled, {useTheme} from 'styled-components';

import {Icon} from '@components/atom';
import {Switch} from '@components/molecule';
import {useDialog} from '@components/organism/Dialog/hook';
import {useDrawer} from '@components/organism/Drawer/hook';
import {EmptyLayout} from '@components/template';
import {DeleteUserDialog} from '@feature/setting/components/organism';
import {useEmail} from '@feature/setting/hook';
import {menuInfoQuery} from '@feature/sideMenu/hook';
import type {MenuInfo} from '@services/interface/user';

const Setting = () => {
  const {handleOpen} = useDrawer();
  const route = useRouter();
  const goEmailSetting = () => route.push('/main/setting/email');
  const {color, size} = useTheme();
  const {updateNotification} = useEmail();
  const {handleOpen: dialogOpen} = useDialog();
  const client = useQueryClient();
  const defaultValue =
    client.getQueryData<MenuInfo>(menuInfoQuery._def)?.notificationEnabled ||
    false;
  const [on, setOn] = useState<MenuInfo['notificationEnabled']>(defaultValue);
  const [observer] = useState(
    () =>
      new QueryObserver<MenuInfo>(client, {
        queryKey: menuInfoQuery._def,
      }),
  );

  useEffect(() => {
    const unsubscribe = observer.subscribe(({data}) => {
      setOn(data?.notificationEnabled || false);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateNotificationEnabled = useCallback(() => {
    updateNotification({
      notificationEnabled: !on,
      emailAddress: client.getQueryData<MenuInfo>(menuInfoQuery._def)
        ?.emailAddress!,
    });
  }, [on, updateNotification, client]);

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
      }}>
      <DeleteUserDialog />
      <Container>
        <div>
          <Title>알림 설정</Title>
          <Content
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}>
            <AlarmContainer>
              알림 받기
              <Switch
                on={on}
                setOn={setOn}
                onClick={updateNotificationEnabled}
              />
            </AlarmContainer>
            <SubContent>
              {`편지 답장과 감사인사에 대한 알림을\n이메일로 받을 수 있어요`}
            </SubContent>
          </Content>
          <Content onClick={goEmailSetting}>
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
          <Content onClick={dialogOpen}>회원탈퇴</Content>
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
