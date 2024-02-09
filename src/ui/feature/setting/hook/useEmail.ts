import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useCookies} from 'next-client-cookies';

import type {MenuInfo, User} from '@application/ports/user';
import {useToast} from '@components/organism/Toast/hook';
import type {ApiError} from '@lib/axios';
import UserService from '@services/user';

const useEmail = () => {
  const cookies = useCookies();
  const token = cookies.get('access-token');
  const userService = new UserService(token);
  const client = useQueryClient();
  const {showToast} = useToast();
  const onError = (error: ApiError) =>
    showToast({message: error.response!.data.message});

  const {mutate: updateEmail} = useMutation<
    void,
    ApiError,
    Pick<User, 'emailAddress'>
  >({
    mutationFn: email => userService.updateUserEmail(email),
    onSuccess: (_, email) => {
      client.setQueryData<MenuInfo>(['menuInfo'], prev => {
        if (!prev) return prev;
        return {
          ...prev,
          emailAddress: email.emailAddress,
        };
      });
      showToast({message: '이메일이 변경되었습니다.'});
    },
    onError,
  });

  const {mutate: updateNotification} = useMutation<
    void,
    ApiError,
    Pick<User, 'notificationEnabled'>
  >({
    mutationFn: notification =>
      userService.updateUserNotification(notification),
    onSuccess: () => {
      client.setQueryData<MenuInfo>(['menuInfo'], prev => {
        if (!prev) return prev;
        return {
          ...prev,
          notificationEnabled: !prev.notificationEnabled,
        };
      });
      showToast({message: '알림 설정이 변경되었습니다.'});
    },
    onError,
  });

  return {updateEmail, updateNotification};
};

export default useEmail;
