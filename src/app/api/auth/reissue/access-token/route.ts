import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';

import AuthenticationService from '@services/auth';

export const GET = async () => {
  const oldAccessToken = cookies().get('access-token')?.value;
  const oldRefreshToken = cookies().get('refresh-token')?.value;
  if (!oldAccessToken || !oldRefreshToken) throw new Error('No token');
  const accessToken = await AuthenticationService.reissueToken(
    oldRefreshToken,
    oldAccessToken,
  );
  cookies().set('access-token', accessToken, {
    maxAge: 60 * 60 * 24 * 7,
  });
  return new NextResponse();
};
