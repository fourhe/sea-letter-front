import {Portal} from '@components/atom';
import {PortalId} from '@components/atom/Portal/portal.enum';
import {Button} from '@components/molecule';
import {Dialog} from '@components/organism';
import {useDialog} from '@components/organism/Dialog/hook';

type SendDialogProps = {
  ok: () => void;
  cancel?: () => void;
  title: string;
};

const SendDialog = (props: SendDialogProps) => {
  const {ok, title, cancel: cancelProp} = props;
  const {handleClose} = useDialog();

  const cancel = () => {
    if (cancelProp) cancelProp();
    handleClose();
  };

  return (
    <Portal portalId={PortalId.Dialog}>
      <Dialog.Container>
        <Dialog.Body>{title}</Dialog.Body>
        <Dialog.Footer>
          <Button color="gray" onClick={cancel}>
            아니요
          </Button>
          <Button color="brown" onClick={ok}>
            네, 보낼게요
          </Button>
        </Dialog.Footer>
      </Dialog.Container>
    </Portal>
  );
};

export default SendDialog;
