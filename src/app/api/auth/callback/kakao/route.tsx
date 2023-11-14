import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export const GET = async (request: NextRequest) => {
  const code = request.nextUrl.searchParams.get('code');
  if (!code) throw new Error('No code');
  const body = JSON.stringify({code});
  const res = await fetch(`${process.env.SERVER_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  const accessToken = res.headers.get('access-token');
  const refreshToken = res.headers.get('refresh-token');

  if (!accessToken || !refreshToken) throw new Error('No token');

  cookies().set('access-token', accessToken);
  cookies().set('refresh-token', refreshToken);

  return NextResponse.redirect(new URL('/main', request.url));
};
