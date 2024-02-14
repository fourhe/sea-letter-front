import {useMutation, useQuery} from '@tanstack/react-query';

import {format} from '@/utils/date';
import type {ApiError} from '@lib/axios';
import type {
  Letter,
  LetterForm,
  LetterReplyForm,
} from '@services/interface/letter';
import LetterService from '@services/letter';

type LetterHookProps = {
  isUpEvent?: boolean;
  letterId?: number;
};

const useLetter = (props?: LetterHookProps) => {
  const {mutateAsync: writeLetter} = useMutation<void, ApiError, LetterForm>({
    mutationFn: variables => LetterService.writeLetter(variables),
  });

  const {mutateAsync: sendReply} = useMutation<void, ApiError, LetterReplyForm>(
    {
      mutationFn: variables => LetterService.sendReply(variables),
    },
  );

  const {data: id} = useQuery({
    queryKey: ['letters'],
    queryFn: () => LetterService.getLetterId(),
    initialData: undefined,
    enabled: !!props?.isUpEvent,
  });

  const {data: letter} = useQuery<
    Letter,
    ApiError,
    Letter,
    [string, LetterHookProps['letterId']]
  >({
    queryKey: ['letters', props?.letterId],
    queryFn: () => LetterService.getLetter(props?.letterId!),
    enabled: !!props?.letterId,
    select: letterData => ({
      ...letterData,
      createdAt: format(new Date(letterData.createdAt!)),
    }),
  });

  return {
    sendReply,
    writeLetter,
    id,
    letter,
  };
};

export default useLetter;
