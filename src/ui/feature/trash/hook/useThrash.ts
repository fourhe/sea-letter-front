import {useMutation, useQuery} from '@tanstack/react-query';
import {useCookies} from 'next-client-cookies';

import {format} from '@/utils/date';
import type {Trash} from '@application/ports/trash';
import {useToast} from '@components/organism/Toast/hook';
import type {ApiError} from '@lib/axios';
import TrashService from '@services/trash';

const useThrash = (trash?: Partial<Trash>) => {
  const cookies = useCookies();
  const token = cookies.get('access-token');
  const thrashService = new TrashService(token);
  const {showToast} = useToast();

  const onError = (error: ApiError) => showToast({message: error.message});

  const {data: trashList} = useQuery({
    queryKey: ['thrash'],
    queryFn: () => thrashService.getTrashList(),
    initialData: [],
    select: data =>
      data.map(item => {
        const deletedAt = format(new Date(item.deletedAt));
        return {
          ...item,
          deletedAt,
        };
      }),
  });

  const {data: trashDetail} = useQuery({
    queryKey: ['thrash', trash?.id],
    queryFn: () => thrashService.getTrashDetail(trash?.id!),
    refetchOnMount: false,
    enabled: !!trash?.id,
  });

  const {mutateAsync: deleteTrash} = useMutation<void, ApiError, number>({
    mutationFn: id => thrashService.deleteTrash(id),
    onError,
  });

  const {mutateAsync: restoreTrash} = useMutation<void, ApiError, number>({
    mutationFn: id => thrashService.restoreTrash(id),
    onError,
  });

  return {trashList, trashDetail, deleteTrash, restoreTrash};
};

export default useThrash;
