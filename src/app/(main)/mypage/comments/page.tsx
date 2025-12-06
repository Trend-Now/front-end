import { getQueryClient } from '@/providers/queryClient';
import { axiosMyComments } from '@/shared/api';
import { MyComments } from '@/views/mypage';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Page({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const { page } = await searchParams;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['mycomments', Number(page) || 1],
    queryFn: () => axiosMyComments(Number(page), 20),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyComments />
    </HydrationBoundary>
  );
}
