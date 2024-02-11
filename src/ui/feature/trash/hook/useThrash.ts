import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {useInfiniteScroll} from '@/hook/query';
import {format} from '@/utils/date';
import {useToast} from '@components/organism/Toast/hook';
import type {ApiError} from '@lib/axios';
import type {Trash} from '@services/interface/trash';
import type {MenuInfo} from '@services/interface/user';
import TrashService from '@services/trash';

const useThrash = (trash?: Partial<Trash>) => {
  const client = useQueryClient();
  const {showToast} = useToast();

  const onError = (error: ApiError) =>
    showToast({message: error.response!.data.message});

  const {data: trashList, fetchNextPage} = useInfiniteScroll({
    queryKey: ['thrashBox'],
    queryFn: ({pageParam}) =>
      TrashService.getTrashList({page: pageParam, size: 20}),
    select: item =>
      item.pages.flatMap(page =>
        page.trashListResponses.map(trashItem => ({
          ...trashItem,
          deletedAt: format(new Date(trashItem.deletedAt!)),
        })),
      ),
  });

  const {data: trashDetail} = useQuery({
    queryKey: ['thrash', trash?.id],
    queryFn: () => TrashService.getTrashDetail(trash?.id!),
    enabled: !!trash?.id,
  });

  const {mutateAsync: deleteTrash} = useMutation<void, ApiError, number>({
    mutationFn: id => TrashService.deleteTrash(id),
    onSuccess: () => client.invalidateQueries({queryKey: ['thrashBox']}),
    onError,
  });

  const {mutateAsync: restoreTrash} = useMutation<void, ApiError, number>({
    mutationFn: id => TrashService.restoreTrash(id),
    onSuccess: async () => {
      await client.invalidateQueries({queryKey: ['thrashBox']});
      client.setQueryData<MenuInfo>(['menuInfo'], prev => {
        if (!prev) return prev;
        return {
          ...prev,
          trashCount: prev.trashCount - 1,
        };
      });
      showToast({message: '메시지가 복구 되었습니다.'});
    },
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
