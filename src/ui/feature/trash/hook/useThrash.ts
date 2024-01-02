import {useQuery} from '@tanstack/react-query';
import {useCookies} from 'next-client-cookies';

import TrashService from '@services/trash';

const useThrash = () => {
  const cookies = useCookies();
  const token = cookies.get('access-token');
  const thrashService = new TrashService(token);

  const {data: trashList} = useQuery({
    queryKey: ['thrash'],
    queryFn: () => thrashService.getTrashList(),
    initialData: [],
  });

  return {trashList};
};

export default useThrash;
