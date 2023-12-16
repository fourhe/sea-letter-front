import {useState} from 'react';
import styled, {useTheme} from 'styled-components';

import {Icon} from '@components/atom';

const Rating = () => {
  const theme = useTheme();
  const [ratingArray, setRatingArray] = useState(
    Array<string>(5).fill(theme.color.primary.lightPink),
  );

  const onClick = (index: number) => {
    const newRatingArray = [...ratingArray].map(
      (_, i) => theme.color.primary[i > index ? 'lightPink' : 'lemonCream'],
    );
    setRatingArray(newRatingArray);
  };

  return (
    <Container>
      {ratingArray.map((value, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Icon.Star key={index} fill={value} onClick={() => onClick(index)} />
      ))}
    </Container>
  );
};

export default Rating;

const Container = styled.div`
  display: flex;
  gap: 11px;
`;
