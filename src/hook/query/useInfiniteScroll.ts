import type {InfiniteData, QueryKey} from '@tanstack/query-core';
import {
  type UndefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';

import type {ApiError} from '@lib/axios';
import type {PageQuery} from '@services/interface';

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
    | 'getNextPageParam'
    | 'getPreviousPageParam'
    | 'initialPageParam'
    | 'maxPages'
  >,
) =>
  useInfiniteQuery({
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.currentPage === lastPage.totalPages - 1) {
        return null;
      }
      return pages.length;
    },
    getPreviousPageParam: (firstPage, pages) => {
      if (firstPage.currentPage === 0) {
        return null;
      }
      return pages.length;
    },
    maxPages: 5,
    initialPageParam: 0,
    gcTime: 0,
    staleTime: 0,
    ...option,
  });

export default useInfiniteScroll;
