import {useMutation} from '@tanstack/react-query';
import {useCookies} from 'next-client-cookies';

import type {User} from '@application/ports/user';
import {useToast} from '@components/organism/Toast/hook';
import type {ApiError} from '@lib/axios';
import UserService from '@services/user';

const useEmail = () => {
  const cookies = useCookies();
  const token = cookies.get('access-token');
  const userService = new UserService(token);
  const {showToast} = useToast();
  const onError = (error: ApiError) => showToast({message: error.message});
  const {mutate: updateEmail} = useMutation<
    void,
    ApiError,
    Pick<User, 'email'>
  >({
    mutationFn: email => userService.updateUserEmail(email),
    onSuccess: () => showToast({message: '이메일이 변경되었습니다.'}),
    onError,
  });

  return {updateEmail};
};

export default useEmail;
