'use client';

import { BoardList } from '@/entities/board';
import { axiosSearchFixedBoardPosts } from '@/shared/api';
import { useUserStore } from '@/shared/store';
import { SearchFixedBoardsResponse } from '@/shared/types';
import { Pagination } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface FixedBoardSearchProps {
  boardName: '연예게시판' | '자유게시판' | '정치게시판';
  basePath: string;
  keyword: string;
}

export function FixedBoardSearch({ boardName, basePath, keyword }: FixedBoardSearchProps) {
  const [page, setPage] = useState(1);
  const { jwt } = useUserStore();

  const { data: posts } = useQuery({
    queryKey: ['searchFixedBoardPosts', keyword, page, jwt],
    queryFn: () => axiosSearchFixedBoardPosts<SearchFixedBoardsResponse>(jwt!, keyword, page),
    select: (data) => data.searchResult[boardName],
    enabled: !!jwt,
  });

  if (!posts) return null;

  return (
    <div className="flex flex-col gap-5">
      <BoardList
        posts={posts.postsListDto}
        totalCount={posts.totalCount}
        page={page}
        basePath={basePath}
        showNumber={false}
      />
      <Pagination currentPage={page} maxPage={posts.totalPageCount} count={5} setPage={setPage} />
    </div>
  );
}
