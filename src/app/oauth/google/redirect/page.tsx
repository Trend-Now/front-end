'use client';

import { LoginResponse } from '@/entities';
import { axiosGoogleAccessToken } from '@/shared/api';
import { UnauthorizedError } from '@/shared/error/error';
import { useUserStore } from '@/shared/store';
import { redirect, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect } from 'react';

export default function Page() {
  return (
    <Suspense>
      <Redirect />
    </Suspense>
  );
}

function Redirect() {
  const code = useSearchParams().get('code');

  const { login } = useUserStore();

  useEffect(() => {
    console.log('useEffect');

    if (code) {
      console.log('code: ', code);

      axiosGoogleAccessToken<LoginResponse>(code).then((res) => {
        const token = res.jwt;

        console.log('token:', token);

        if (token) {
          login(res.jwt, res.memberId);

          redirect('/home');
        } else {
          throw new UnauthorizedError('토큰 정보를 불러오지 못했습니다.');
        }
      });
    }
  }, [code]);

  if (!code) throw new UnauthorizedError('인가 코드 정보를 불러오지 못했습니다.');

  return <div>구글 로그인 리다이렉트중...</div>;
}
