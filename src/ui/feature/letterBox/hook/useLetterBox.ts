import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useCookies} from 'next-client-cookies';

import {useInfiniteScroll} from '@/hook/query';
import {format} from '@/utils/date';
import type {MenuInfo} from '@application/ports/user';
import {useToast} from '@components/organism/Toast/hook';
import type {ApiError} from '@lib/axios';
import LetterBoxService from '@services/letterBox';

type LetterBoxProps = {
  id?: number;
};

const useLetterBox = (props?: LetterBoxProps) => {
  const cookies = useCookies();
  const client = useQueryClient();
  const token = cookies.get('access-token');
  const repository = new LetterBoxService(token);
  const {showToast} = useToast();

  const onError = (error: ApiError) =>
    showToast({message: error.response!.data.message});

  const {data: letterBoxList, fetchNextPage} = useInfiniteScroll({
    queryKey: ['letterBox'],
    queryFn: ({pageParam}) =>
      repository.getLetterList({page: pageParam, size: 10}),
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
    select: detailData => ({
      ...detailData,
      createdAt: format(new Date(detailData.createdAt!)),
    }),
  });

  const {mutateAsync: deleteLetter} = useMutation<void, ApiError, number>({
    mutationFn: id => repository.deleteLetter(id),
    onError,
    onSuccess: async () => {
      await client.invalidateQueries({queryKey: ['letterBox']});
      client.setQueryData<MenuInfo>(['menuInfo'], prev => {
        if (!prev) return prev;
        return {
          ...prev,
          trashCount: prev.trashCount + 1,
        };
      });
      showToast({message: '메시지가 삭제 되었습니다.'});
    },
  });

  return {
    letterBoxList: {
      data: letterBoxList || [],
      fetchNextPage,
    },
    letterDetail,
    deleteLetter,
  };
};

export default useLetterBox;
