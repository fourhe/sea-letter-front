import {QueryObserver, useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import styled, {useTheme} from 'styled-components';

import {NewUserLetter} from '@/ui/assets/svgs';
import type {MenuInfo} from '@application/ports/user';
import {Portal} from '@components/atom';
import {PortalId} from '@components/atom/Portal/portal.enum';
import {Button} from '@components/molecule';
import {Dialog} from '@components/organism';
import {useDialog} from '@components/organism/Dialog/hook';

const NewUserDialog = () => {
  const {color} = useTheme();
  const {handleOpen, handleClose} = useDialog();
  const client = useQueryClient();
  const route = useRouter();

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
      handleClose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToEmail = () => {
    route.push('/main/setting/email');
    handleClose();
  };

  return (
    <Portal portalId={PortalId.Dialog}>
      <Dialog.Container>
        <Dialog.Body
          style={{
            width: '65vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 20,
          }}>
          <NewUserLetter />
          <Title>{`내가 보낸 편지에 답장이 오면\n이메일로 알려드려요!`}</Title>
          <SubTitle>{`현재 로그인된 이메일 외의\n다른 이메일을 원한다면 변경해주세요.`}</SubTitle>
        </Dialog.Body>
        <Dialog.Footer type="vertical">
          <Button color="brown" onClick={goToEmail}>
            이메일 변경하러 가기
          </Button>
          <Button
            color="white"
            style={{
              color: color.secondary.brown,
            }}
            onClick={handleClose}>
            현재 이메일 유지하기
          </Button>
        </Dialog.Footer>
      </Dialog.Container>
    </Portal>
  );
};

export default NewUserDialog;

const Title = styled.h4`
  font-size: ${({theme}) => theme.typography.fontSizes.lg}px;
  font-weight: ${({theme}) => theme.typography.fontWeights.bold};
  line-height: ${({theme}) => theme.typography.lineHeights.lg}px;
  text-align: center;
  white-space: pre-wrap;
`;

const SubTitle = styled.p`
  font-size: ${({theme}) => theme.typography.fontSizes.sm}px;
  line-height: ${({theme}) => theme.typography.lineHeights.sm}px;
  text-align: center;
  white-space: pre-wrap;
  margin-bottom: 10px;
`;
