import type {InfiniteQueryObserverResult} from '@tanstack/react-query';
import {useCallback, useEffect, useState} from 'react';

export type UseIntersectionObserverProps = {
  threshold?: number;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
};

const useIntersectionObserver = (props: UseIntersectionObserverProps) => {
  const {threshold = 0.5, hasNextPage, fetchNextPage} = props;
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);

  const observerCallback = useCallback<IntersectionObserverCallback>(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
    },
    [hasNextPage, fetchNextPage], // observerCallback 함수가 이 값들에 의존하므로, 이 값들이 변경될 때만 새로운 함수를 생성합니다.
  );

  useEffect(() => {
    if (!target) {
      Error('target is null');
      return () => {};
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [observerCallback, threshold, target]);

  return {setTarget};
};

export default useIntersectionObserver;
