import {useMutation, useQuery} from '@tanstack/react-query';
import {useCookies} from 'next-client-cookies';

import {format} from '@/utils/date';
import type {
  Letter,
  LetterForm,
  LetterReplyForm,
} from '@application/ports/letter';
import type {ApiError} from '@lib/axios';
import LetterService from '@services/letter';

type LetterHookProps = {
  isUpEvent?: boolean;
  letterId?: number;
};

const useLetter = (props?: LetterHookProps) => {
  const cookies = useCookies();
  const token = cookies.get('access-token');
  const repository = new LetterService(token);

  const {mutateAsync: writeLetter} = useMutation<void, ApiError, LetterForm>({
    mutationFn: variables => repository.writeLetter(variables),
  });

  const {mutateAsync: sendReply} = useMutation<void, ApiError, LetterReplyForm>(
    {
      mutationFn: variables => repository.sendReply(variables),
    },
  );

  const {data: id, isError: isLetterIdError} = useQuery({
    queryKey: ['letters'],
    queryFn: () => repository.getLetterId(),
    initialData: null,
    enabled: !!props?.isUpEvent,
  });

  const {data: letter} = useQuery<
    Letter,
    ApiError,
    Letter,
    [string, LetterHookProps['letterId']]
  >({
    queryKey: ['letters', props?.letterId],
    queryFn: () => repository.getLetter(props?.letterId!),
    enabled: !!props?.letterId,
    select: letterData => {
      const createdAt = format(new Date(letterData.createdAt!));
      return {
        ...letterData,
        createdAt,
      };
    },
  });

  return {
    sendReply,
    writeLetter,
    id,
    letter,
    isLetterIdError,
  };
};

export default useLetter;
