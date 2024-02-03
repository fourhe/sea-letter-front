'use client';

import {QueryObserver, useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {ReactNode, useEffect} from 'react';

import {NewUserDialog} from '@/ui/feature/main/components/organism';
import type {MenuInfo} from '@application/ports/user';
import {BackGround, Portal} from '@components/atom';
import {PortalId} from '@components/atom/Portal/portal.enum';
import {Toast} from '@components/organism';
import {useDialog} from '@components/organism/Dialog/hook';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = (props: MainLayoutProps) => {
  const {children} = props;
  const route = useRouter();
  const client = useQueryClient();
  const {handleOpen, handleClose} = useDialog();
  const observer = new QueryObserver<MenuInfo>(client, {
    queryKey: ['menuInfo'],
  });

  useEffect(() => {
    let isOpen;
    const unsubscribe = observer.subscribe(result => {
      isOpen = result.data?.isNewUser;
    });
    if (isOpen && !localStorage.getItem('isNewUser')) {
      handleOpen();
      localStorage.setItem('isNewUser', 'true');
    }
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToEmail = () => {
    route.push('/main/setting/email');
    handleClose();
  };

  return (
    <>
      <BackGround />
      <Portal portalId={PortalId.Toast}>
        <Toast />
      </Portal>
      <NewUserDialog
        title={`내가 보낸 편지에 답장이 오면\n이메일로 알려드려요!`}
        subTitle={`현재 로그인된 이메일 외의\n다른 이메일을 원한다면 변경해주세요.`}
        ok={goToEmail}
      />
      {children}
    </>
  );
};

export default MainLayout;
