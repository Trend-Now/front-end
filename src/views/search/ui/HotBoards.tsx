import { Pagination } from '@/shared/ui';
import { HotBoardSearchList } from '@/widgets/search';
import React from 'react';

// interface SearchProps {
//   /**@param {string} searchType 검색 결과 종류 */
//   searchType: '실시간 인기 게시판' | '실시간 인기 게시글' | '전날 인기 게시판' | '전날 인기 게시글' | '고정 게시판' | '고정 게시글';
// }

export default function HotBoards() {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex gap-x-2">
        <span className="text-2xl font-bold text-gray-800">실시간 인기 게시판</span>
        <span className="text-2xl font-bold text-brand-500">12건</span>
      </div>
      <HotBoardSearchList />
      <Pagination currentPage={1} maxPage={2} count={5} />
    </div>
  );
}
