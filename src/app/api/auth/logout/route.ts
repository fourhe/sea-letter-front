import {cookies} from 'next/headers';
import {type NextRequest, NextResponse} from 'next/server';

export const GET = async (request: NextRequest) => {
  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/logout`, {
    method: 'POST',
    headers: {
      'Refresh-Token': cookies().get('refresh-token')?.value!,
    },
  });
  cookies().delete('access-token');
  cookies().delete('refresh-token');
  return NextResponse.redirect(new URL('/', request.url));
};
