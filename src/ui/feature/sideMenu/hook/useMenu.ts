import {useQuery} from '@tanstack/react-query';
import {usePathname} from 'next/navigation';

import {menuInfoQuery} from './queryKeys';

import UserService from '@services/user';

const useMenu = () => {
  const route = usePathname();
  const {data: menuInfo} = useQuery({
    queryKey: menuInfoQuery._def,
    queryFn: () => UserService.getUser(),
    enabled: route.startsWith('/main'),
  });

  return {menuInfoQuery: menuInfo};
};

export default useMenu;
