'use client';

import { axiosSearchRealtimeBoards } from '@/shared/api';
import { useUserStore } from '@/shared/store';
import { SearchRealtimeBoardsResponse } from '@/shared/types';
import { HotBoardSearchList } from '@/widgets/search';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function HotBoards({ keyword }: { keyword: string }) {
  const { jwt } = useUserStore();
  const { data: boards } = useQuery({
    queryKey: ['SearchRealtimeBoards', keyword, jwt],
    queryFn: () => axiosSearchRealtimeBoards<SearchRealtimeBoardsResponse>(jwt!, keyword),
    select: (data) => data.searchResult,
    enabled: !!jwt,
  });

  if (!boards) return;

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex gap-x-2">
        <span className="text-2xl font-bold text-gray-800">실시간 인기 게시판</span>
        <span className="text-2xl font-bold text-brand-500">{boards.length}건</span>
      </div>
      <HotBoardSearchList boards={boards} />
    </div>
  );
}
