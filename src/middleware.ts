import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export const middleware = (request: NextRequest) => {
  const refreshToken = cookies().has('refresh-token');
  if (refreshToken) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/auth/login', request.url));
};

export const config = {
  matcher: '/main/:path*',
};
