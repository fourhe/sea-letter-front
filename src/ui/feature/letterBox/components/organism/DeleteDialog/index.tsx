import {Portal} from '@components/atom';
import {PortalId} from '@components/atom/Portal/portal.enum';
import {Button} from '@components/molecule';
import {Dialog} from '@components/organism';
import {useDialog} from '@components/organism/Dialog/hook';

type DeleteDialogProps = {
  ok: () => void;
  title: string;
};

const DeleteDialog = (props: DeleteDialogProps) => {
  const {ok, title} = props;
  const {handleClose, open} = useDialog();

  return (
    <Portal portalId={PortalId.Dialog}>
      {open ? (
        <Dialog.Container
          containerStyle={{
            width: '65vw',
          }}>
          <Dialog.Body>{title}</Dialog.Body>
          <Dialog.Footer
            style={{
              justifyContent: 'space-evenly',
            }}>
            <Button color="gray" onClick={handleClose}>
              취소
            </Button>
            <Button color="brown" onClick={ok}>
              삭제하기
            </Button>
          </Dialog.Footer>
        </Dialog.Container>
      ) : null}
    </Portal>
  );
};

export default DeleteDialog;
