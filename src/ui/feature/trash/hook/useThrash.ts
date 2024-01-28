import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useCookies} from 'next-client-cookies';

import {useInfiniteScroll} from '@/hook/query';
import {format} from '@/utils/date';
import type {Trash} from '@application/ports/trash';
import {useToast} from '@components/organism/Toast/hook';
import type {ApiError} from '@lib/axios';
import TrashService from '@services/trash';

const useThrash = (trash?: Partial<Trash>) => {
  const cookies = useCookies();
  const client = useQueryClient();
  const token = cookies.get('access-token');
  const thrashService = new TrashService(token);
  const {showToast} = useToast();

  const onError = (error: ApiError) =>
    showToast({message: error.response!.data.message});

  const {data: trashList, fetchNextPage} = useInfiniteScroll({
    queryKey: ['thrashBox'],
    queryFn: ({pageParam}) =>
      thrashService.getTrashList({page: pageParam, size: 20}),
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
    queryFn: () => thrashService.getTrashDetail(trash?.id!),
    enabled: !!trash?.id,
  });

  const {mutateAsync: deleteTrash} = useMutation<void, ApiError, number>({
    mutationFn: id => thrashService.deleteTrash(id),
    onError,
  });

  const {mutateAsync: restoreTrash} = useMutation<void, ApiError, number>({
    mutationFn: id => thrashService.restoreTrash(id),
    onSuccess: async () => {
      await client.invalidateQueries({queryKey: ['thrash']});
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
