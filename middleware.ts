import { NextRequest, NextResponse } from 'next/server';

const USERNAME = process.env.BASIC_ID || 'admin';
const PASSWORD = process.env.BASIC_PWD || 'password';

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  console.log('Authorization Header:', authHeader); // デバッグ用ログ

  if (!authHeader) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  const [scheme, encoded] = authHeader.split(' ');

  if (scheme !== 'Basic' || !encoded) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  const [username, password] = atob(encoded).split(':');

  if (username !== USERNAME || password !== PASSWORD) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/blog/new', // ベーシック認証を適用するルート
};
