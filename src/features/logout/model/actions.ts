'use server';

import { cookies } from 'next/headers';

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete({
    name: 'access_token',
  });
  cookieStore.delete({
    name: 'refresh_token',
  });
}
