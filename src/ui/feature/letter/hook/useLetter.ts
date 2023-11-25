import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {useCookies} from 'next-client-cookies';

import type {LetterForm} from '@application/ports/letter';
import LetterService from '@services/letter';

const useLetter = () => {
  const cookies = useCookies();
  const token = cookies.get('access-token');
  const repository = new LetterService(token);

  const {mutateAsync} = useMutation<void, AxiosError, LetterForm>({
    mutationFn: variables => repository.writeLetter(variables),
  });

  return {
    writeLetter: mutateAsync,
  };
};

export default useLetter;
