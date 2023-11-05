'use client';

import type {PanInfo, ValueAnimationTransition} from 'framer-motion';
import {animate, useMotionValue} from 'framer-motion';
import {Children, useCallback, useEffect, useMemo, useRef} from 'react';

import Container from './Container';
import {useCarousel} from './hook';
import Slider from './Slider';
import type {CarouselProps} from './types';

const transition: ValueAnimationTransition = {
  type: 'spring',
  bounce: 0,
};

const Carousel = (props: CarouselProps) => {
  const {children, autoPlay, interval = 2000, loop} = props;
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const childrenArray = Children.toArray(children);
  const {index, setIndex, dotLength, setDotLength} = useCarousel();

  useEffect(() => {
    setDotLength(childrenArray.length);
  }, [childrenArray.length, setDotLength]);

  const calculateNewX = useMemo(
    () => -index * (containerRef.current?.clientWidth || 0),
    [index],
  );

  const handleEndDrag = (_e: Event, dragProps: PanInfo) => {
    const clientWidth = containerRef.current?.clientWidth || 0;

    const {offset} = dragProps;

    if (
      (index + 1 === dotLength && offset.x < 0) ||
      (index === 0 && offset.x > 0)
    ) {
      animate(x, calculateNewX, transition);
      return;
    }

    if (offset.x > clientWidth / 4) {
      handlePrev();
    } else if (offset.x < -clientWidth / 4) {
      handleNext();
    } else {
      animate(x, calculateNewX, transition);
    }
  };

  const handleNext = useCallback(() => {
    const idx = loop ? 0 : index;
    setIndex(index + 1 === dotLength ? idx : index + 1);
  }, [dotLength, index, loop, setIndex]);

  const handlePrev = useCallback(() => {
    const idx = loop ? dotLength - 1 : 0;
    setIndex(index - 1 < 0 ? idx : index - 1);
  }, [dotLength, index, loop, setIndex]);

  useEffect(() => {
    const controls = animate(x, calculateNewX, transition);
    return controls.stop;
  }, [calculateNewX, index, x]);

  useEffect(() => {
    if (!autoPlay) {
      return;
    }
    const timer = setInterval(handleNext, interval);
    // eslint-disable-next-line consistent-return
    return () => clearInterval(timer);
  }, [autoPlay, handleNext, interval]);

  return (
    <Container ref={containerRef}>
      {childrenArray.map((child, i) => (
        <Slider
          /* eslint-disable-next-line react/no-array-index-key */
          key={i}
          onDragEnd={handleEndDrag}
          totalSliders={dotLength}
          x={x}
          i={i}>
          {child}
        </Slider>
      ))}
    </Container>
  );
};

export default Carousel;
