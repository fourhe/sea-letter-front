import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export const GET = async (request: NextRequest) => {
  cookies().delete('access-token');
  cookies().delete('refresh-token');
  return NextResponse.redirect(new URL('/', request.url));
};
