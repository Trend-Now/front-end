import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CountdownTimer, EyeOpenIcon, WriteIcon } from '@/shared/ui';

interface MedalRowProps {
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

export default function MedalRow({ boardId, rank, keyword, count, views, timer }: MedalRowProps) {
  return (
    <Link href={`/hotboard/${boardId}`}>
      <div className="flex cursor-pointer flex-col gap-y-4 rounded-xl bg-brand-100 p-3 hover:bg-[#EDF5FF] md:rounded-[20px] md:p-4">
        <div className="flex items-center justify-between">
          <span className="flex min-w-0 items-center gap-x-4">
            <span className="relative aspect-square h-8 w-8 md:h-10 md:w-10">
              {rank === 1 ? (
                <Image src="/images/gold.gif" alt="gold" priority unoptimized fill />
              ) : rank === 2 ? (
                <Image src="/images/silver.gif" alt="silver" priority unoptimized fill />
              ) : (
                <Image src="/images/bronze.gif" alt="bronze" priority unoptimized fill />
              )}
            </span>
            <span className="truncate text-base font-bold text-brand-500 md:text-xl">
              {keyword}
            </span>
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
                <WriteIcon />
                <span className="text-2xs font-regular text-gray-500">{count}</span>
              </span>
              <span className="flex items-center gap-x-1">
                <EyeOpenIcon />
                <span className="text-2xs font-regular text-gray-500">{views}</span>
              </span>
            </span>
          </span>
        </div>
        {/* {currentExpand === rank && (
        <div className="gap-y-1 rounded-2xl bg-white px-4 py-3">
          <div>
            <span className="flex items-center gap-x-1">
              <span>
                <Fire />
              </span>
              <span className="text-md font-semiBold text-gray-800">尹탄핵심판 게시판 인기글</span>
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-sm font-medium text-gray-500">탄핵선고가 늦어지는 이유</span>
            <span className="flex gap-x-3">
              <span className="flex items-center gap-x-1.5">
                <Heart18 />
                <span className="text-sm font-regular text-gray-500">447</span>
              </span>
              <span className="flex items-center gap-x-1.5">
                <Comment18 />
                <span className="text-sm font-regular text-gray-500">3</span>
              </span>
            </span>
          </div>
        </div>
      )} */}
      </div>
    </Link>
  );
}
