import {cookies} from 'next/headers';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

import AuthenticationService from '@services/auth';

export const GET = async (request: NextRequest) => {
  const code = request.nextUrl.searchParams.get('code');
  if (!code) throw new Error('No code');
  const {accessToken, refreshToken} = await AuthenticationService.logIn(code);
  cookies().set('access-token', accessToken, {
    maxAge: 60 * 60 * 24 * 7,
  });
  cookies().set('refresh-token', refreshToken, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: true,
  });

  return NextResponse.redirect(new URL('/', request.url));
};
