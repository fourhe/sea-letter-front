import {NextMiddleware, NextResponse} from 'next/server';

export const middleware: NextMiddleware = ({url, cookies}) => {
  // const isMobile = userAgent({headers}).device.type === 'mobile';
  // const debug = cookies.get('debug')?.value;
  // if (
  //   (!isMobile && !(process.env.NODE_ENV === 'development')) ||
  //   debug !== '1'
  // ) {
  //   return NextResponse.redirect(new URL('/desktop', url));
  // }
  const hasRefreshToken = cookies.has('refresh-token');
  if (hasRefreshToken) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/auth/login', url));
};

export const config = {
  matcher: '/main/:path*',
};
