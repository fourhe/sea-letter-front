import {NextMiddleware, NextResponse, userAgent} from 'next/server';

export const middleware: NextMiddleware = ({headers, url, cookies}) => {
  const isMobile = userAgent({headers}).device.type === 'mobile';
  const isDebug = !!cookies.get('debug')?.value;
  if (!isDebug && !isMobile) {
    return NextResponse.redirect(new URL('/desktop', url));
  }
  const hasRefreshToken = cookies.has('refresh-token');
  if (hasRefreshToken) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/auth/login', url));
};

export const config = {
  matcher: '/main/:path*',
};
