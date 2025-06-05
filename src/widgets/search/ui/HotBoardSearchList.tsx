import React from 'react';
import HotBoardListRow from './HotBoardSearchListRow';

export default function HotBoardSearchList() {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-3 border-b border-gray-200 px-2 pb-4 *:text-nowrap *:text-sm *:font-regular *:text-gray-500">
        <span className="flex-1 text-left">검색어</span>
        <span className="w-16 text-center">게시물 수</span>
        <span className="w-16 text-center">총 조회수</span>
        <span className="w-[5.625rem] text-center">타이머</span>
      </div>
      <div className="flex flex-col">
        {new Array(10).fill(0).map((_, idx) => (
          <HotBoardListRow key={idx} keyword="서울 폭설" count={125} views={2324} timer={225} />
        ))}
      </div>
    </div>
  );
}
