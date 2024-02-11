import {useMutation, useQuery} from '@tanstack/react-query';

import {format} from '@/utils/date';
import {useToast} from '@components/organism/Toast/hook';
import type {ApiError} from '@lib/axios';
import ReplyService from '@services/reply';

const useReply = (letterId?: number, replyId?: number) => {
  const {showToast} = useToast();
  const onError = (error: ApiError) =>
    showToast({message: error.response!.data.message});

  const {data: replyList} = useQuery({
    queryKey: ['replyList', letterId],
    queryFn: () => ReplyService.getReplyList(letterId!),
    initialData: [],
    enabled: !!letterId,
  });

  const {data: replyDetail} = useQuery({
    queryKey: ['replyDetail', replyId, letterId],
    queryFn: () => ReplyService.getReplyDetail(letterId!, replyId!),
    enabled: !!replyId,
    refetchOnMount: false,
    select: data => {
      const createdAt = format(new Date(data.createdAt!));
      return {
        ...data,
        createdAt,
      };
    },
  });

  const {mutateAsync: deleteReply} = useMutation<void, ApiError, number>({
    mutationFn: id => ReplyService.deleteReply(id),
    onError,
  });

  const {mutateAsync: setThank} = useMutation<void, ApiError, number>({
    mutationFn: id => ReplyService.setThanks(id),
    onError,
  });

  return {replyList, replyDetail, deleteReply, setThank};
};

export default useReply;
