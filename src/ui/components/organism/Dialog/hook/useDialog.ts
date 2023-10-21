import {atom, useAtom} from 'jotai';

const dialogAtom = atom(false);

const useDialog = () => {
  const [open, setOpen] = useAtom(dialogAtom);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return {open, handleClose, handleOpen};
};

export default useDialog;
