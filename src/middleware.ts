import {cookies} from 'next/headers';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

import {isMobileUserAgent} from '@/utils/userAgent';

export const middleware = (request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith('/auth')) {
    const userAgent = request.headers.get('user-agent')!;
    const isMobile = isMobileUserAgent(userAgent);
    if (isMobile || process.env.NODE_ENV === 'development') {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/desktop', request.url));
  }
  const isRefreshToken = cookies().has('refresh-token');
  if (isRefreshToken) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/auth/login', request.url));
};

export const config = {
  matcher: ['/main/:path*', '/auth/:path*'],
};
