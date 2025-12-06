import { getQueryClient } from '@/providers/queryClient';
import { axiosMyPosts } from '@/shared/api';
import { MyPosts } from '@/views/mypage';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';

export default async function Page({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const { page } = await searchParams;
  const cks = await cookies();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['myposts', Number(page) || 1],
    queryFn: () => axiosMyPosts(Number(page) || 1, 20, cks.toString()),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyPosts />
    </HydrationBoundary>
  );
}
