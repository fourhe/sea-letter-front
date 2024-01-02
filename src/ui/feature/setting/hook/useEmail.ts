import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {useCookies} from 'next-client-cookies';

import type {User} from '@application/ports/user';
import {useToast} from '@components/organism/Toast/hook';
import UserService from '@services/user';

const useEmail = () => {
  const cookies = useCookies();
  const token = cookies.get('access-token');
  const userService = new UserService(token);
  const {showToast} = useToast();
  const onError = (error: AxiosError) => showToast({message: error.message});
  const {mutate: updateEmail} = useMutation<
    void,
    AxiosError,
    Pick<User, 'email'>
  >({
    mutationFn: email => userService.updateUserEmail(email),
    onError,
  });

  return {updateEmail};
};

export default useEmail;
