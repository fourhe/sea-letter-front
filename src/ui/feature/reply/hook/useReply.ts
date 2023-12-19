import {useQuery} from '@tanstack/react-query';
import {useCookies} from 'next-client-cookies';

import {format} from '@/utils/date';
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

  const {data: replyList} = useQuery({
    queryKey: ['replyList', letterId],
    queryFn: () => repository.getReplyList(letterId!),
    initialData: [],
    enabled: !!letterId,
  });

  const {data: replyDetail} = useQuery({
    queryKey: ['replyDetail', replyId],
    queryFn: () => repository.getReplyDetail(letterId!, replyId!),
    initialData: {
      title: '',
      content: '',
      createdAt: '',
    },
    enabled: !!replyId,
    select: data => {
      const createdAt = format(new Date(data.createdAt!));
      return {
        ...data,
        createdAt,
      };
    },
  });

  return {replyList, replyDetail};
};

export default useReply;
