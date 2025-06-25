'use client';

import { axiosSearchRealtimePosts } from '@/shared/api';
import { useUserStore } from '@/shared/store';
import { SearchRealtimePostsResponse } from '@/shared/types';
import { Pagination } from '@/shared/ui';
import { HotPostsSearchList } from '@/widgets/search';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

export default function HotPosts() {
  const [page, setPage] = useState(1);
  const keyword = useSearchParams().get('keyword') as string;

  const { jwt } = useUserStore();
  const { data: posts } = useQuery({
    queryKey: ['SearchRealtimePosts', keyword, page, jwt],
    queryFn: () => axiosSearchRealtimePosts<SearchRealtimePostsResponse>(jwt!, keyword, page),
    select: (data) => data.searchResult,
    enabled: !!jwt,
  });

  if (!posts) return null;
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex gap-x-2">
        <span className="text-2xl font-bold text-gray-800">실시간 인기 게시글</span>
        <span className="text-2xl font-bold text-brand-500">{posts.realtimePostList.length}건</span>
      </div>
      <HotPostsSearchList posts={posts.realtimePostList} />
      <Pagination currentPage={page} setPage={setPage} maxPage={posts.totalPageCount} count={5} />
    </div>
  );
}
