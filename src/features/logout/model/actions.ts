'use server';

import { options } from '@/shared/config';
import { cookies } from 'next/headers';

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete({
    name: 'access_token',
    ...options,
  });
  cookieStore.delete({
    name: 'refresh_token',
    ...options,
  });
}
