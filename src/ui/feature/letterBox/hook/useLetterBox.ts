import {useMutation, useQuery} from '@tanstack/react-query';
import {useCookies} from 'next-client-cookies';

import {useInfiniteScroll} from '@/hook/query';
import {format} from '@/utils/date';
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
  const {showToast} = useToast();

  const onError = (error: ApiError) => showToast({message: error.message});

  const {
    data: letterBoxList,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteScroll({
    queryKey: ['letterBox'],
    queryFn: ({pageParam}) =>
      repository.getLetterList({page: pageParam, size: 10}),
    refetchOnWindowFocus: true,
    select: item =>
      item.pages.flatMap(page =>
        page.letterListResponses.map(letterList => ({
          ...letterList,
          createdAt: format(new Date(letterList.createdAt!)),
        })),
      ),
  });

  const {data: letterDetail} = useQuery({
    queryKey: ['letterDetail', props?.id],
    queryFn: () => repository.getLetterDetail(props?.id!),
    enabled: !!props?.id,
    refetchOnMount: false,
    select: detailData => {
      const createdAt = format(new Date(detailData.createdAt!));
      return {
        ...detailData,
        createdAt,
      };
    },
  });

  const {mutateAsync: deleteLetter} = useMutation<void, ApiError, number>({
    mutationFn: id => repository.deleteLetter(id),
    onError,
  });

  return {
    letterBoxList: {
      data: letterBoxList || [],
      hasNextPage,
      fetchNextPage,
    },
    letterDetail,
    deleteLetter,
  };
};

export default useLetterBox;
