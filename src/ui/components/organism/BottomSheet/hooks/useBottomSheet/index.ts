'use client';

import {useAnimation} from 'framer-motion';
import {atom, useAtom} from 'jotai';
import {useEffect} from 'react';

import usePreviousValue from '../usePreviousValue';

const bottomSheetStorm = atom(false);

const useBottomSheet = () => {
  const [open, setOpen] = useAtom(bottomSheetStorm);
  const controls = useAnimation();
  const prevIsOpen = usePreviousValue(open);

  const onDragEnd = async (info: PointerEvent) => {
    const shouldClose = info?.y > 250;

    if (shouldClose) {
      await controls.start('hidden');
      setOpen(false);
    } else {
      await controls.start('visible');
      setOpen(true);
    }
  };

  useEffect(() => {
    if (prevIsOpen && !open) {
      controls.start('hidden');
    } else {
      controls.start('visible');
    }
  }, [controls, open, prevIsOpen]);

  return {onDragEnd, controls, setOpen, open, prevIsOpen};
};

export default useBottomSheet;
