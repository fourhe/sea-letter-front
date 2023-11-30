import {useQuery} from '@tanstack/react-query';
import {useCookies} from 'next-client-cookies';

import LetterBoxService from '@services/letterBox';

type LetterBoxProps = {
  id?: number;
};

const useLetterBox = (props?: LetterBoxProps) => {
  const cookies = useCookies();
  const token = cookies.get('access-token');
  const repository = new LetterBoxService(token);

  const {data: letterBoxList} = useQuery({
    queryKey: ['mailBox'],
    queryFn: () => repository.getLetterList(),
    initialData: [],
  });

  const {data: letterDetail} = useQuery({
    queryKey: ['letterBox', props?.id],
    queryFn: () => repository.getLetterDetail(props?.id!),
    enabled: !!props?.id,
  });

  return {letterBoxList, letterDetail};
};

export default useLetterBox;
