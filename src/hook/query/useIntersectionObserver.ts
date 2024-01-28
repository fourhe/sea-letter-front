import type {InfiniteQueryObserverResult} from '@tanstack/react-query';
import {useCallback, useEffect, useState} from 'react';

export type UseIntersectionObserverProps = {
  threshold?: number;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
};

const useIntersectionObserver = (props: UseIntersectionObserverProps) => {
  const {threshold = 0.1, fetchNextPage} = props;
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  const observerCallback = useCallback<IntersectionObserverCallback>(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fetchNextPage().then(r => {
            if (r.hasNextPage) {
              r.fetchNextPage();
            }
          });
        }
      });
    },
    [fetchNextPage],
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
