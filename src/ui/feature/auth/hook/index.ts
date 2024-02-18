import {useMutation, useQuery} from '@tanstack/react-query';

import AuthenticationService from '@services/auth';

export const useAuthenticate = () => {
  const {data: logInFormUrl} = useQuery({
    queryKey: ['auth'],
    queryFn: () => AuthenticationService.logInForm(),
    initialData: '',
  });

  const {mutateAsync: deleteUser} = useMutation({
    mutationFn: () => AuthenticationService.deleteUser(),
  });

  return {
    logInFormUrl,
    deleteUser,
  };
};
