import {useMutation, useQuery} from '@tanstack/react-query';
import type {AxiosError} from 'axios';
import {useCookies} from 'next-client-cookies';
import {useMemo} from 'react';

import type {LetterForm, LetterReplyForm} from '@application/ports/letter';
import LetterService from '@services/letter';

type LetterHookProps = {
  isUpEvent?: boolean;
  letterId?: number;
};

const useLetter = (props?: LetterHookProps) => {
  const cookies = useCookies();
  const token = cookies.get('access-token');
  const repository = new LetterService(token);

  const {mutateAsync} = useMutation<void, AxiosError, LetterForm>({
    mutationFn: variables => repository.writeLetter(variables),
  });

  const {mutateAsync: sendReply} = useMutation<
    void,
    AxiosError,
    LetterReplyForm
  >({
    mutationFn: variables => repository.sendReply(variables),
  });

  const {
    data,
    isPending,
    isError: isLetterIdError,
  } = useQuery({
    queryKey: ['letters'],
    queryFn: () => repository.getLetterId(),
    initialData: null,
    enabled: !!props?.isUpEvent,
  });

  const id = useMemo(() => {
    if (isPending) return null;
    return data;
  }, [data, isPending]);

  const {data: letter, isPending: isLetterPending} = useQuery({
    queryKey: ['letters', props?.letterId],
    queryFn: () => repository.getLetter(props?.letterId!),
    enabled: !!props?.letterId,
    select: letterData => {
      const inputDate = new Date(letterData.createdAt!);
      const createdAt = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(inputDate);
      return {
        ...letterData,
        createdAt,
      };
    },
  });

  return {
    sendReply,
    writeLetter: mutateAsync,
    id,
    letter,
    isLetterPending,
    isLetterIdError,
  };
};

export default useLetter;
