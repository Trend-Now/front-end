'use server';

import { options } from '@/shared/config';
import { cookies } from 'next/headers';

export async function logoutAction() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('access_token');

  if (accessToken) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}/api/v1/member/logout`, {
        method: 'POST',
        headers: {
          Cookie: `${accessToken.name}=${accessToken.value}`,
        },
      });
    } catch (error) {
      console.warn('Backend logout API call failed. Proceeding to delete cookies.', error);
    }
  }

  cookieStore.delete({
    name: 'access_token',
    ...options,
  });
  cookieStore.delete({
    name: 'refresh_token',
    ...options,
  });
}
