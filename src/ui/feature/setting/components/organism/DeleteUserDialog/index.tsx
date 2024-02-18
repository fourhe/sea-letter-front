import {useRouter} from 'next/navigation';
import {useCallback} from 'react';

import {Portal} from '@components/atom';
import {PortalId} from '@components/atom/Portal/portal.enum';
import {Button} from '@components/molecule';
import {Dialog} from '@components/organism';
import {useDialog} from '@components/organism/Dialog/hook';
import {useAuthenticate} from '@feature/auth/hook';

const DeleteUserDialog = () => {
  const {handleClose, open} = useDialog();
  const route = useRouter();
  const {deleteUser} = useAuthenticate();
  const ok = useCallback(async () => {
    await deleteUser();
    await fetch('/api/auth/delete', {
      method: 'DELETE',
    });
    handleClose();
    route.push('/');
  }, [deleteUser, handleClose, route]);
  return (
    <Portal portalId={PortalId.Dialog}>
      {open ? (
        <Dialog.Container
          containerStyle={{
            width: '73vw',
            alignItems: 'center',
          }}>
          <Dialog.Body>{`회원탈퇴를 진행할까요?\n탈퇴 시 모든 데이터가 삭제되며\n삭제된 데이터는 복구되지 않습니다.`}</Dialog.Body>
          <Dialog.Footer>
            <Button color="gray" onClick={handleClose}>
              취소
            </Button>
            <Button color="pink" onClick={ok}>
              탈퇴하기
            </Button>
          </Dialog.Footer>
        </Dialog.Container>
      ) : null}
    </Portal>
  );
};

export default DeleteUserDialog;
