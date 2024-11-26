import { NextRequest, NextResponse } from 'next/server';

// マッチさせるルートを指定
export const config = {
  matcher: ['/blog/new'], // ベーシック認証を適用するルート
};

export function middleware(req: NextRequest) {
  const isLocalDevelopment = process.env.NODE_ENV === 'development';

  // 開発環境または認証情報が設定されていない場合は認証をスキップ
  if (isLocalDevelopment || !process.env.BASIC_ID || !process.env.BASIC_PWD) {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get('authorization');

  // 認証ヘッダーがない場合は401を返す
  if (!basicAuth) {
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  try {
    // ヘッダーから認証情報をデコード
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // ユーザー名とパスワードを検証
    if (user === process.env.BASIC_ID && pwd === process.env.BASIC_PWD) {
      return NextResponse.next(); // 認証成功
    }
  } catch (e) {
    return new Response('Invalid Authentication', { status: 400 });
  }

  // 認証失敗時
  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
