import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useCookies} from 'next-client-cookies';

import {format} from '@/utils/date';
import {LetterBox} from '@application/ports/letterBox';
import {useToast} from '@components/organism/Toast/hook';
import type {ApiError} from '@lib/axios';
import LetterBoxService from '@services/letterBox';

type LetterBoxProps = {
  id?: number;
};

const useLetterBox = (props?: LetterBoxProps) => {
  const cookies = useCookies();
  const token = cookies.get('access-token');
  const repository = new LetterBoxService(token);
  const client = useQueryClient();
  const {showToast} = useToast();

  const onError = (error: ApiError) => showToast({message: error.message});

  const {data: letterBoxList} = useQuery({
    queryKey: ['letterBox'],
    queryFn: () => repository.getLetterList(),
    initialData: client.getQueryData(['mailBox']) || [],
  });

  const {data: letterDetail} = useQuery({
    queryKey: ['letterDetail', props?.id],
    queryFn: () => repository.getLetterDetail(props?.id!),
    enabled: !!props?.id,
    select: data => {
      const createdAt = format(new Date(data.createdAt!));
      return {
        ...data,
        createdAt,
      };
    },
  });

  const {mutateAsync: deleteLetter} = useMutation<void, ApiError, number>({
    mutationFn: id => repository.deleteLetter(id),
    onSuccess: (data, deleteId) => {
      const newDataList = client
        .getQueryData<LetterBox[]>(['letterBox'])!
        .filter(letter => letter.id !== Number(deleteId));
      client.setQueryData(['letterBox'], newDataList);
    },
    onError,
  });

  return {letterBoxList, letterDetail, deleteLetter};
};

export default useLetterBox;
