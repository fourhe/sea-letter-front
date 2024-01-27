import {useMutation, useQuery} from '@tanstack/react-query';
import {useCookies} from 'next-client-cookies';

import {format} from '@/utils/date';
import {useToast} from '@components/organism/Toast/hook';
import type {ApiError} from '@lib/axios';
import ReplyService from '@services/reply';

type ReplyHookProps = {
  letterId?: number;
  replyId?: number;
};

const useReply = (props: ReplyHookProps) => {
  const {letterId, replyId} = props;
  const cookies = useCookies();
  const token = cookies.get('access-token');
  const repository = new ReplyService(token);
  const {showToast} = useToast();
  const onError = (error: ApiError) => showToast({message: error.message});

  const {data: replyList} = useQuery({
    queryKey: ['replyList', letterId],
    queryFn: () => repository.getReplyList(letterId!),
    initialData: [],
    enabled: !!letterId,
  });

  const {data: replyDetail} = useQuery({
    queryKey: ['replyDetail', replyId, letterId],
    queryFn: () => repository.getReplyDetail(letterId!, replyId!),
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
    mutationFn: id => repository.deleteReply(id),
    onError,
  });

  return {replyList, replyDetail, deleteReply};
};

export default useReply;
