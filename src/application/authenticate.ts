import {useQuery} from '@tanstack/react-query';

import AuthenticationService from '@services/auth';

export const useAuthenticate = () => {
  const {data} = useQuery({
    queryKey: ['auth'],
    queryFn: () => AuthenticationService.logInForm(),
  });

  return {
    logInFormUrl: data || '',
  };
};
