import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

import AuthenticationService from '@services/auth';

export const GET = async (request: NextRequest) => {
  const code = request.nextUrl.searchParams.get('code');
  if (!code) throw new Error('No code');
  const {accessToken, refreshToken} = await AuthenticationService.logIn(code);
  cookies().set('access-token', accessToken, {httpOnly: true});
  cookies().set('refresh-token', refreshToken, {httpOnly: true});

  return NextResponse.redirect(new URL('/', request.url));
};
