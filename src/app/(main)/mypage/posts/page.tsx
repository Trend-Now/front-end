import { getQueryClient } from '@/providers/queryClient';
import { axiosMyPosts } from '@/shared/api';
import { MyPosts } from '@/views/mypage';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Page({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const { page } = await searchParams;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['myposts', Number(page) || 1],
    queryFn: () => axiosMyPosts(Number(page), 20),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyPosts />
    </HydrationBoundary>
  );
}
