import {useState} from 'react';
import {useTheme} from 'styled-components';

import {Icon} from '@components/atom';

const Rating = () => {
  const theme = useTheme();
  const [ratingArray, setRatingArray] = useState(
    Array<string>(5).fill(theme.color.primary.lightPink),
  );

  const onClick = (index: number) => {
    const newRatingArray = [...ratingArray].map((_, i) => {
      if (i > index) {
        return theme.color.primary.lightPink;
      }
      return theme.color.primary.lemonCream;
    });
    setRatingArray(newRatingArray);
  };

  return (
    <>
      {ratingArray.map((value, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Icon.Star key={index} fill={value} onClick={() => onClick(index)} />
      ))}
    </>
  );
};

export default Rating;
