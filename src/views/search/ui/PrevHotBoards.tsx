import { Pagination } from '@/shared/ui';
import { HotBoardSearchList } from '@/widgets/search';
import React from 'react';

interface PrevHotBoardsProps {
  /**@param {string} keyword 검색 키워드 */
  keyword?: string;
}

export default function PrevHotBoards({ keyword }: PrevHotBoardsProps) {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex gap-x-2">
        <span className="text-2xl font-bold text-gray-800">전날 인기 게시판</span>
        <span className="text-2xl font-bold text-brand-500">12건</span>
      </div>
      <HotBoardSearchList />
      <Pagination currentPage={1} maxPage={2} count={5} />
    </div>
  );
}
