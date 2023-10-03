'use client';

import type {NextPage} from 'next';
import {useEffect} from 'react';

type ErrorProps = {
  error: Error & {digest?: string};
  reset: () => void;
};

const Error: NextPage<ErrorProps> = props => {
  const {error, reset} = props;
  useEffect(() => {
    console.log('error', error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};
export default Error;
