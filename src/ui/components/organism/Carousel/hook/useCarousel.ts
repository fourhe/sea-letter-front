import {atom, useAtom} from 'jotai';

const carouselIndexAtom = atom(0);
const carouselDotLengthAtom = atom(0);

const UseCarousel = () => {
  const [index, setIndex] = useAtom(carouselIndexAtom);
  const [dotLength, setDotLength] = useAtom(carouselDotLengthAtom);

  return {index, dotLength, setDotLength, setIndex};
};

export default UseCarousel;
