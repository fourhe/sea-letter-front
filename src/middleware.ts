import {cookies} from 'next/headers';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

export const middleware = (request: NextRequest) => {
  const isRefreshToken = cookies().has('refresh-token');
  if (isRefreshToken) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/auth/login', request.url));
};

export const config = {
  matcher: '/main/:path*',
};
