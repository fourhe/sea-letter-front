import {atom, useAtom} from 'jotai';

const drawerAtom = atom(false);

const useDrawer = () => {
  const [open, setOpen] = useAtom(drawerAtom);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return {open, handleClose, handleOpen};
};

export default useDrawer;
