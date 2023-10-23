import type {MotionValue, PanInfo} from 'framer-motion';
import type {ReactNode} from 'react';

export type DotProps = {
  length: number;
  activeIndex: number;
};

export type CarouselProps = {
  children: ReactNode;
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
};

export type SliderProps = {
  x: MotionValue<number>;
  i: number;
  children: ReactNode;
  onDragEnd: (e: Event, dragProps: PanInfo) => void;
  totalSliders: number;
};
