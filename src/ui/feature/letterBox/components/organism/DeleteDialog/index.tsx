import {Portal} from '@components/atom';
import {PortalId} from '@components/atom/Portal/portal.enum';
import {Button} from '@components/molecule';
import {Dialog} from '@components/organism';
import {useDialog} from '@components/organism/Dialog/hook';

type SendDialogProps = {
  ok: () => void;
  title: string;
};

const DeleteDialog = (props: SendDialogProps) => {
  const {ok, title} = props;
  const {handleClose} = useDialog();

  return (
    <Portal portalId={PortalId.Dialog}>
      <Dialog.Container
        containerStyle={{
          width: '60vw',
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
    </Portal>
  );
};

export default DeleteDialog;
