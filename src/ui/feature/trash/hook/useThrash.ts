import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useCallback} from 'react';

import {thrashQueryKeys} from './queryKeys';

import {useInfiniteScroll} from '@/hook/query';
import {format} from '@/utils/date';
import {useToast} from '@components/organism/Toast/hook';
import {menuInfoQuery} from '@feature/sideMenu/hook';
import type {ApiError} from '@lib/axios';
import type {Trash, TrashFilterType} from '@services/interface/trash';
import type {MenuInfo} from '@services/interface/user';
import TrashService from '@services/trash';

const useThrash = (trash?: Partial<Trash>, filter?: TrashFilterType) => {
  const client = useQueryClient();
  const {showToast} = useToast();

  const onError = (error: ApiError) =>
    showToast({message: error.response!.data.message});

  const onSuccess = useCallback(async () => {
    await client.invalidateQueries({queryKey: thrashQueryKeys.thrashBox._def});
    client.setQueryData<MenuInfo>(menuInfoQuery._def, prev => {
      if (!prev) return prev;
      return {
        ...prev,
        trashCount: prev.trashCount - 1,
      };
    });
  }, [client]);

  const {data: trashList, fetchNextPage} = useInfiniteScroll({
    queryKey: thrashQueryKeys.thrashBox.filter(filter!).queryKey,
    queryFn: ({pageParam}) =>
      TrashService.getTrashList({page: pageParam, size: 10, type: filter!}),
    select: item =>
      item.pages.flatMap(page =>
        page.trashListResponses.map(trashItem => ({
          ...trashItem,
          deletedAt: format(new Date(trashItem.deletedAt!)),
        })),
      ),
    enabled: !!filter,
  });

  const {data: trashDetail} = useQuery({
    queryKey: thrashQueryKeys.thrash.detail(trash?.id!).queryKey,
    queryFn: () => TrashService.getTrashDetail(trash?.id!),
    enabled: !!trash?.id,
    select: data => ({
      ...data,
      deletedAt: format(new Date(data.deletedAt!)),
    }),
  });

  const {mutateAsync: deleteTrash} = useMutation<void, ApiError, number>({
    mutationFn: id => TrashService.deleteTrash(id),
    onSuccess,
    onError,
  });

  const {mutateAsync: restoreTrash} = useMutation<void, ApiError, number>({
    mutationFn: id => TrashService.restoreTrash(id),
    onSuccess,
    onError,
  });

  return {
    trashList: {
      data: trashList || [],
      fetchNextPage,
    },
    trashDetail,
    deleteTrash,
    restoreTrash,
  };
};

export default useThrash;
