import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {useCookies} from 'next-client-cookies';

import {format} from '@/utils/date';
import type {Trash} from '@application/ports/trash';
import TrashService from '@services/trash';

const useThrash = (trash?: Partial<Trash>) => {
  const cookies = useCookies();
  const token = cookies.get('access-token');
  const thrashService = new TrashService(token);
  const client = useQueryClient();

  const {data: trashList} = useQuery({
    queryKey: ['thrash'],
    queryFn: () => thrashService.getTrashList(),
    initialData: client.getQueryData(['thrash']) || [],
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
    enabled: !!trash?.id,
  });

  const {mutateAsync: deleteTrash} = useMutation<void, AxiosError, number>({
    mutationFn: id => thrashService.deleteTrash(id),
    onSuccess: (_, variables) => {
      const newTrashList = client
        .getQueryData<Trash[]>(['thrash'])!
        .filter(item => item.id !== variables);
      client.setQueryData(['thrash'], newTrashList);
    },
  });

  const {mutateAsync: restoreTrash} = useMutation<void, AxiosError, number>({
    mutationFn: id => thrashService.restoreTrash(id),
    onSuccess: (_, variables) => {
      const newTrashList = client
        .getQueryData<Trash[]>(['thrash'])!
        .filter(item => item.id !== variables);
      client.setQueryData(['thrash'], newTrashList);
    },
  });

  return {trashList, trashDetail, deleteTrash, restoreTrash};
};

export default useThrash;
