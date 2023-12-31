import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {useCookies} from 'next-client-cookies';

import type {User} from '@application/ports/user';
import UserService from '@services/user';

const useEmail = () => {
  const cookies = useCookies();
  const token = cookies.get('access-token');
  const userService = new UserService(token);
  const {mutate: updateEmail} = useMutation<
    void,
    AxiosError,
    Pick<User, 'email'>
  >({
    mutationFn: email => userService.updateUserEmail(email),
  });

  return {updateEmail};
};

export default useEmail;
