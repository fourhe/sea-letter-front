import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {useCookies} from 'next-client-cookies';

import {format} from '@/utils/date';
import LetterBoxService from '@services/letterBox';

type LetterBoxProps = {
  id?: number;
};

const useLetterBox = (props?: LetterBoxProps) => {
  const cookies = useCookies();
  const token = cookies.get('access-token');
  const repository = new LetterBoxService(token);
  const client = useQueryClient();

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

  const {mutateAsync: deleteLetter} = useMutation<void, AxiosError, number>({
    mutationFn: id => repository.deleteLetter(id),
    onError: error => {
      console.log(error);
    },
  });

  return {letterBoxList, letterDetail, deleteLetter};
};

export default useLetterBox;
