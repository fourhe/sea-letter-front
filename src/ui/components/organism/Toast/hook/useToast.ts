import {atom, useAtom} from 'jotai';

import type {ToastProps} from '../index';

const toastAtom = atom<ToastProps>({
  isVisible: false,
  message: '',
  color: '',
  containerColor: '',
});

const useToast = () => {
  const [toast, setToast] = useAtom(toastAtom);
  const {color, containerColor, isVisible, message} = toast;

  const showToast = (props: ToastProps) => {
    setToast({...props, isVisible: true});
    setTimeout(() => {
      setToast({...props, isVisible: false});
    }, 2000);
  };

  return {
    showToast,
    color,
    containerColor,
    isVisible,
    message,
  };
};

export default useToast;
