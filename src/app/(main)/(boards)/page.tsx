import { RequireLoginModalSSR } from '@/features/login';
import { Home } from '@/views/home';
import { Suspense } from 'react';

export default async function Page({ searchParams }: { searchParams: Promise<{ login: string }> }) {
  const { login } = await searchParams;
  return (
    <>
      <Suspense>
        <Home />
      </Suspense>
      <RequireLoginModalSSR open={Boolean(login)} />
    </>
  );
}
