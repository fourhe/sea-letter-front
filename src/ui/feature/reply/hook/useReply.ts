import {useMutation, useQuery} from '@tanstack/react-query';
import {usePathname} from 'next/navigation';
import {useTheme} from 'styled-components';

import {format} from '@/utils/date';
import {useToast} from '@components/organism/Toast/hook';
import type {ApiError} from '@lib/axios';
import ReplyService from '@services/reply';

const useReply = (letterId?: number, replyId?: number) => {
  const {showToast} = useToast();
  const {color} = useTheme();
  const path = usePathname().split('/');

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
    select: data => ({
      ...data,
      createdAt: format(new Date(data.createdAt!)),
    }),
  });

  const {mutateAsync: deleteReply} = useMutation<void, ApiError, number>({
    mutationFn: id => ReplyService.deleteReply(id),
    onError: error => {
      showToast({
        message: error.response!.data.message,
        color: color.secondary.brown,
        containerColor: color.white,
      });
    },
  });

  const {mutateAsync: setThank} = useMutation<void, ApiError, number>({
    mutationFn: id => ReplyService.setThanks(id),
    onError: error => {
      showToast({
        message: error.response!.data.message,
        color: path[4] ? color.secondary.brown : color.primary.pointPink,
        containerColor: path[4] ? color.white : undefined,
      });
    },
  });

  return {replyList, replyDetail, deleteReply, setThank};
};

export default useReply;
