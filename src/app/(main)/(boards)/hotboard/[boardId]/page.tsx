import { getQueryClient } from '@/providers/queryClient';
import { axiosHotBoardInfo, axiosHotBoardList } from '@/shared/api';
import { NotFoundError } from '@/shared/error/error';
import { HotBoard } from '@/views/hotBoards';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Page({ params }: { params: Promise<{ boardId: string }> }) {
  const { boardId } = await params;

  const queryClient = getQueryClient();

  if (!boardId) throw new NotFoundError();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['hotBoardInfo', boardId],
      queryFn: () => axiosHotBoardInfo(Number(boardId)),
    }),
    queryClient.prefetchQuery({
      queryKey: ['hotBoardList', 1],
      queryFn: () => axiosHotBoardList(),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HotBoard boardId={Number(boardId)} />
    </HydrationBoundary>
  );
}
