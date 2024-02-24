import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {letterBoxQueryKeys} from './queryKeys';

import {useInfiniteScroll} from '@/hook/query';
import {format} from '@/utils/date';
import {useToast} from '@components/organism/Toast/hook';
import {menuInfoQuery} from '@feature/sideMenu/hook';
import type {ApiError} from '@lib/axios';
import type {MenuInfo} from '@services/interface/user';
import LetterBoxService from '@services/letterBox';

export type LetterBoxProps = {
  id?: number;
};

const useLetterBox = (props?: LetterBoxProps) => {
  const client = useQueryClient();
  const {showToast} = useToast();

  const onError = (error: ApiError) =>
    showToast({message: error.response!.data.message});

  const {data: letterBoxList, fetchNextPage} = useInfiniteScroll({
    queryKey: letterBoxQueryKeys.letterBox._def,
    queryFn: ({pageParam}) =>
      LetterBoxService.getLetterList({page: pageParam, size: 10}),
    select: item =>
      item.pages.flatMap(page =>
        page.letterListResponses.map(letterList => ({
          ...letterList,
          createdAt: format(new Date(letterList.createdAt!)),
        })),
      ),
  });

  const {data: letterDetail} = useQuery({
    queryKey: letterBoxQueryKeys.letterDetail.detail(props?.id).queryKey,
    queryFn: () => LetterBoxService.getLetterDetail(props?.id!),
    enabled: !!props?.id,
    refetchOnMount: false,
    select: detailData => ({
      ...detailData,
      createdAt: format(new Date(detailData.createdAt!)),
    }),
  });

  const {mutateAsync: deleteLetter} = useMutation<void, ApiError, number>({
    mutationFn: id => LetterBoxService.deleteLetter(id),
    onError,
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: letterBoxQueryKeys.letterBox._def,
      });
      client.setQueryData<MenuInfo>(menuInfoQuery._def, prev => {
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
