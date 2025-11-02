const isProduction = process.env.NODE_ENV === 'production';

export const options = {
  path: '/',
  httpOnly: true,
  secure: isProduction,
  domain: isProduction ? '.trendnow.me' : 'localhost',
  sameSite: isProduction ? 'none' : 'lax',
} as const;
