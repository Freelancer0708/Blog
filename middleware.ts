import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_IPS = process.env.ALLOWED_IPS?.split(',').map(ip => ip.trim()) || [];

export function middleware(req: NextRequest) {
  const xForwardedFor = req.headers.get('x-forwarded-for'); // プロキシ環境用
  const ip = xForwardedFor?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || '127.0.0.1';

  console.log('Request IP:', ip);
  console.log('Allowed IPs:', ALLOWED_IPS);

  if (!ip || !ALLOWED_IPS.includes(ip)) {
    console.log('Access denied for IP:', ip);
    return new NextResponse('Access denied: Unauthorized IP', { status: 403 });
  }

  console.log('Access granted for IP:', ip);
  return NextResponse.next();
}

export const config = {
  matcher: '/blog/new',
};
