import {useQuery} from '@tanstack/react-query';
import {useCookies} from 'next-client-cookies';

import UserService from '@services/user';

const useMenu = (refetch: boolean) => {
  const cookies = useCookies();
  const token = cookies.get('access-token');
  const userService = new UserService(token);

  const {data: menuInfo} = useQuery({
    queryKey: ['menuInfo'],
    queryFn: () => userService.getUser(),
    initialData: {
      receivedThankCount: 0,
      sentLetterCount: 0,
      sentReplyCount: 0,
    },
    enabled: !!token && refetch,
  });

  return {menuInfo};
};

export default useMenu;