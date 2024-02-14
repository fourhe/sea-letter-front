import {useMutation, useQueryClient} from '@tanstack/react-query';

import {useToast} from '@components/organism/Toast/hook';
import type {ApiError} from '@lib/axios';
import {MenuInfo, UserNotification} from '@services/interface/user';
import UserService from '@services/user';

const useEmail = () => {
  const client = useQueryClient();
  const {showToast} = useToast();
  const onError = (error: ApiError) =>
    showToast({message: error.response!.data.message});

  const {mutate: updateEmail} = useMutation<void, ApiError, UserNotification>({
    mutationFn: email => UserService.updateUserEmail(email),
    onSuccess: (_, email) => {
      client.setQueryData<MenuInfo>(['menuInfo'], prev => {
        if (!prev) return prev;
        return {
          ...prev,
          emailAddress: email.emailAddress,
          notificationEnabled: email.notificationEnabled,
        };
      });
      showToast({message: '이메일이 변경되었습니다.'});
    },
    onError,
  });

  const {mutate: updateNotification} = useMutation<
    void,
    ApiError,
    UserNotification
  >({
    mutationFn: notification =>
      UserService.updateUserNotification(notification),
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
