import {Portal} from '@components/atom';
import {PortalId} from '@components/atom/Portal/portal.enum';
import {Button} from '@components/molecule';
import {Dialog} from '@components/organism';
import {useDialog} from '@components/organism/Dialog/hook';

type SendDialogProps = {
  handleOpen: () => void;
};

const SendDialog = (props: SendDialogProps) => {
  const {handleOpen} = props;
  const {handleClose} = useDialog();

  return (
    <Portal portalId={PortalId.Dialog}>
      <Dialog.Container>
        <Dialog.Body>편지를 바다로 보낼까요?</Dialog.Body>
        <Dialog.Footer>
          <Button color="gray" onClick={handleClose}>
            아니요
          </Button>
          <Button color="brown" onClick={handleOpen}>
            네, 보낼게요
          </Button>
        </Dialog.Footer>
      </Dialog.Container>
    </Portal>
  );
};

export default SendDialog;
