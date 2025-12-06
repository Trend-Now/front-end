import { RequireLoginModalSSR } from '@/features/login';
import { getQueryClient } from '@/providers/queryClient';
import { axiosHotBoardList } from '@/shared/api';
import { Home } from '@/views/home';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ login: string; page: string }>;
}) {
  const { login, page } = await searchParams;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['hotBoardList', Number(page)],
    queryFn: () => axiosHotBoardList(Number(page)),
  });

  return (
    <>
      <Suspense>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Home />
        </HydrationBoundary>
      </Suspense>
      <RequireLoginModalSSR open={Boolean(login)} />
    </>
  );
}
