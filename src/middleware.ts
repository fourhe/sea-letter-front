import {NextMiddleware, NextResponse, userAgent} from 'next/server';

export const middleware: NextMiddleware = ({headers, url, cookies}) => {
  const isMobile = userAgent({headers}).device.type === 'mobile';
  if (!isMobile && !(process.env.NODE_ENV === 'development')) {
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
