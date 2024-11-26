import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 環境変数から許可されているIPアドレスを取得
const ALLOWED_IPS = (process.env.ALLOWED_IPS || '').split(',');

export function middleware(req: NextRequest) {
  // リクエスト元のIPアドレスを取得
  const forwardedFor = req.headers.get('x-forwarded-for') || '';
  const ip = forwardedFor.split(',')[0].trim(); // カンマ区切りの最初のIPを取得

  // IPが許可されているかチェック
  if (!ALLOWED_IPS.includes(ip)) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // 許可されている場合は次の処理へ
  return NextResponse.next();
}

// このmiddlewareを特定のルートに適用
export const config = {
  matcher: '/blog/new', // /blog/newのみに適用
};
