import {useEffect, useRef} from 'react';

const usePreviousValue = <T>(value: T) => {
  const previousValueRef = useRef<T | null>(null);

  useEffect(() => {
    previousValueRef.current = value;
  }, [value]);

  return previousValueRef.current;
};

export default usePreviousValue;
