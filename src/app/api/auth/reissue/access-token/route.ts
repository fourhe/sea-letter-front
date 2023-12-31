import {cookies} from 'next/headers';
import {type NextRequest, NextResponse} from 'next/server';

import AuthenticationService from '@services/auth';

export const GET = async (request: NextRequest) => {
  const oldAccessToken = cookies().get('access-token')?.value;
  const oldRefreshToken = cookies().get('refresh-token')?.value;
  if (!oldAccessToken || !oldRefreshToken) throw new Error('No token');
  const {refreshToken, accessToken} = await AuthenticationService.reissueToken(
    oldRefreshToken,
    oldAccessToken,
  );
  cookies().set('access-token', accessToken);
  cookies().set('refresh-token', refreshToken);
  return NextResponse.redirect(new URL('/', request.url));
};
