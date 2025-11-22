import Link from 'next/link';
import React from 'react';
import { CountdownTimer, View16, Write16 } from '@/shared/ui';

interface HotBoardListRowProps {
  /**@param {number} boardId 게시판 ID */
  boardId: number;
  /**@param {number} rank 순위 */
  rank: number;
  /**@param {string} keyword 검색어 */
  keyword: string;
  /**@param {number} count 게시물 수 */
  count: number;
  /**@param {number} views 총 조회수 */
  views: number;
  /**@param {number} timer 타이머 */
  timer: number;
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=110-12045&t=J0Jb8mvTQUQUNMvU-4
 */
export default function HotBoardListRow({
  boardId,
  rank,
  keyword,
  count,
  views,
  timer,
}: HotBoardListRowProps) {
  return (
    <Link href={`/hotboard/${boardId}`}>
      <div className="flex cursor-pointer items-center justify-between rounded-2xl border border-gray-200 p-3 hover:bg-gray-100 md:rounded-[20px] md:p-4">
        <span className="flex min-w-0 items-center gap-x-3">
          <span className="flex h-7 w-7 items-center justify-center text-base font-semiBold text-gray-800 md:text-xl">
            {rank}
          </span>
          <span className="truncate text-md font-semiBold text-gray-800 md:text-lg">{keyword}</span>
        </span>
        <span className="flex flex-col items-end gap-x-2 md:flex-row md:items-center">
          <span className="hidden w-16 text-center text-md font-regular text-gray-500 md:block">
            {count}
          </span>
          <span className="hidden w-16 text-center text-md font-regular text-gray-500 md:block">
            {views}
          </span>
          <CountdownTimer
            initialSeconds={timer}
            iconSize="w-[22px] h-[22px] md:w-7 md:h-7"
            textSize="text-base md:text-2xl"
            boxSize="w-[120px]"
          />
          <span className="flex gap-x-2 md:hidden">
            <span className='flex items-center gap-x-1 after:ml-1 after:h-1.5 after:w-px after:bg-gray-300 after:content-[""]'>
              <Write16 />
              <span className="text-2xs font-regular text-gray-500">{count}</span>
            </span>
            <span className="flex items-center gap-x-1">
              <View16 />
              <span className="text-2xs font-regular text-gray-500">{views}</span>
            </span>
          </span>
        </span>
      </div>
    </Link>
  );
}
