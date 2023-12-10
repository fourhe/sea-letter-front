import {useQuery} from '@tanstack/react-query';
import {useCookies} from 'next-client-cookies';

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
      const inputDate = new Date(data.createdAt!);
      const createdAt = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(inputDate);
      return {
        ...data,
        createdAt,
      };
    },
  });

  return {replyList, replyDetail};
};

export default useReply;
