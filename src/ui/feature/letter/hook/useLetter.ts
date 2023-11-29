import {useMutation, useQuery} from '@tanstack/react-query';
import type {AxiosError} from 'axios';
import {useCookies} from 'next-client-cookies';
import {useMemo} from 'react';

import type {
  Letter,
  LetterForm,
  LetterReplyForm,
} from '@application/ports/letter';
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

  const {data, isPending} = useQuery({
    queryKey: ['letters'],
    queryFn: () => repository.getLetterId(),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !!props?.isUpEvent,
  });

  const id = useMemo(() => {
    if (isPending) return null;
    return data;
  }, [data, isPending]);

  const {data: letter, isPending: isLetterPending} = useQuery({
    queryKey: ['letters', props?.letterId],
    queryFn: () => repository.getLetter(props?.letterId!),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !!props?.letterId,
  });

  const letterData = useMemo(() => {
    const initLetter: Letter = {
      title: '',
      content: '',
      createdAt: null,
    };
    if (!letter) return initLetter;
    const inputDate = new Date(letter.createdAt!);
    const createdAt = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24시간 형식 사용
    }).format(inputDate);

    return {...letter, createdAt};
  }, [letter]);

  return {
    sendReply,
    writeLetter: mutateAsync,
    id,
    letter: letterData,
    isLetterPending,
  };
};

export default useLetter;
