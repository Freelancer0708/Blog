import { NextRequest, NextResponse } from 'next/server';

// 許可するIPアドレスのリスト
const ALLOWED_IPS = process.env.ALLOWED_IPS?.split(',').map(ip => ip.trim()) || [];

export function middleware(req: NextRequest) {
  // リクエスト元のIPアドレスを取得
  const xForwardedFor = req.headers.get('x-forwarded-for');
  const ip = xForwardedFor?.split(',')[0]?.trim(); // 複数のIPがカンマ区切りで送られる場合の処理

  // IPアドレスが許可リストにない場合、403を返す
  if (!ip || !ALLOWED_IPS.includes(ip)) {
    return new NextResponse('Access denied: Unauthorized IP', { status: 403 });
  }

  // 許可された場合は次の処理へ
  return NextResponse.next();
}

// ミドルウェアを適用するルートを指定
export const config = {
  matcher: '/blog/new', // 投稿画面のルートのみ制限
};
