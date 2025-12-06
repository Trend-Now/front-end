import { getQueryClient } from '@/providers/queryClient';
import { axiosMyScraps } from '@/shared/api';
import { MyScraps } from '@/views/mypage';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Page({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const { page } = await searchParams;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['myscraps', Number(page) || 1],
    queryFn: () => axiosMyScraps(Number(page), 20),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyScraps />
    </HydrationBoundary>
  );
}
