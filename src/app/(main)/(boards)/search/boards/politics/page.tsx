'use client';
import { BoardList } from '@/entities/board';
import { axiosSearchFixedBoardPosts } from '@/shared/api';
import { useUserStore } from '@/shared/store';
import { SearchFixedBoardsResponse } from '@/shared/types';
import { Pagination } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const [page, setPage] = useState(1);
  const { jwt } = useUserStore();
  const keyword = useSearchParams().get('keyword') as string;
  const { data: posts } = useQuery({
    queryKey: ['searchFixedBoardPosts', keyword, page, jwt],
    queryFn: () => axiosSearchFixedBoardPosts<SearchFixedBoardsResponse>(jwt!, keyword, page),
    select: (data) => data.searchResult.정치게시판,
    enabled: !!jwt,
  });

  if (!posts) return null;

  return (
    <div className="flex flex-col gap-5">
      <BoardList
        posts={posts.postsListDto}
        totalCount={posts.totalCount}
        page={page}
        basePath="/politics"
        showNumber={false}
      />
      <Pagination currentPage={page} maxPage={posts.totalPageCount} count={5} setPage={setPage} />
    </div>
  );
}
