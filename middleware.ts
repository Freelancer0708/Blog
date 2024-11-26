import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 環境変数から許可されているIPアドレスを取得
const ALLOWED_IPS = (process.env.ALLOWED_IPS || '').split(',');

export function middleware(req: NextRequest) {
  // リクエスト元のIPを取得
  const ip = req.ip || req.headers.get('x-forwarded-for')?.split(',')[0];

  // 許可IPリストにない場合は403エラーページを返す
  if (!ALLOWED_IPS.includes(ip || '')) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // 許可されている場合は次の処理に進む
  return NextResponse.next();
}

// このmiddlewareを特定のルートに適用
export const config = {
  matcher: '/blog/new', // /blog/newのみに適用
};
