import {cookies} from 'next/headers';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

export const DELETE = async (request: NextRequest) => {
  cookies().delete('access-token');
  cookies().delete('refresh-token');
  return NextResponse.redirect(new URL('/', request.url));
};
