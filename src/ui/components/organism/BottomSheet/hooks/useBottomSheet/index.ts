'use client';

import {useAnimation} from 'framer-motion';
import {atom, useAtom} from 'jotai';
import {useEffect} from 'react';

import usePreviousValue from '../usePreviousValue';

export const bottomSheetStorm = atom(false);

const useBottomSheet = () => {
  const [isOpen, setIsOpen] = useAtom(bottomSheetStorm);
  const controls = useAnimation();
  const prevIsOpen = usePreviousValue(isOpen);

  const onDragEnd = async (info: PointerEvent) => {
    const shouldClose = info?.y > 400;

    if (shouldClose) {
      await controls.start('hidden');
      setIsOpen(false);
    } else {
      await controls.start('visible');
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (prevIsOpen && !isOpen) {
      controls.start('hidden');
    } else if (!prevIsOpen && isOpen) {
      controls.start('visible');
    }
  }, [controls, isOpen, prevIsOpen]);

  return {onDragEnd, controls, setIsOpen, isOpen};
};

export default useBottomSheet;
