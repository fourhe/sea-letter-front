import {useQuery} from '@tanstack/react-query';
import {usePathname} from 'next/navigation';

import UserService from '@services/user';

const useMenu = () => {
  const route = usePathname();

  const {data: menuInfo} = useQuery({
    queryKey: ['menuInfo'],
    queryFn: () => UserService.getUser(),
    enabled: route === '/main',
  });

  return {menuInfo};
};

export default useMenu;
