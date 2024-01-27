import type {InfiniteData, QueryKey} from '@tanstack/query-core';
import {
  type UndefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';

import type {PageQuery} from '@application/ports';
import type {ApiError} from '@lib/axios';

export const useInfiniteScroll = <
  TQueryFnData,
  TError = ApiError,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = number,
>(
  option: Omit<
    UndefinedInitialDataInfiniteOptions<
      PageQuery<TQueryFnData>,
      TError,
      TData,
      TQueryKey,
      TPageParam | number
    >,
    'getNextPageParam' | 'initialPageParam'
  >,
) =>
  useInfiniteQuery({
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.currentPage === lastPage.totalPage) {
        return undefined;
      }
      return pages.length;
    },
    initialPageParam: 0,
    ...option,
  });

export default useInfiniteScroll;
