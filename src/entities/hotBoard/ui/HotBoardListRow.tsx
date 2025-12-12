import Link from 'next/link';
import { CountdownTimer, EyeOpenIcon, WriteIcon } from '@/shared/ui';
import Image from 'next/image';
import { BronzeMedalImage, GoldMedalImage, SilverMedalImage } from '@/shared/assets';
import { cn } from '@/shared/lib';

const MEDAL_IMAGES = {
  1: GoldMedalImage,
  2: SilverMedalImage,
  3: BronzeMedalImage,
} as const;

const RankBadge = ({ rank }: { rank: number }) => {
  // 1~3위 (메달)
  if (rank <= 3) {
    return (
      <Image
        src={MEDAL_IMAGES[rank as 1 | 2 | 3]}
        alt={`${rank}위`}
        className="h-8 w-8 md:h-10 md:w-10"
        priority
        unoptimized
      />
    );
  }
  // 4위 이하 (숫자)
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center text-center font-bold text-gray-800 md:text-xl">
      {rank}
    </span>
  );
};

interface HotBoardListRowProps {
  /**@param {number} boardId 게시판 ID */
  boardId: number;
  /**@param {number} rank 순위 */
  rank?: number;
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
  rank = 0,
  keyword,
  count,
  views,
  timer,
}: HotBoardListRowProps) {
  const isMedal = rank >= 1 && rank <= 3;
  return (
    <Link
      href={`/hotboard/${boardId}`}
      className={cn(
        'flex h-[60px] cursor-pointer items-center justify-between rounded-2xl px-3 md:rounded-[20px] md:px-4',
        isMedal
          ? 'bg-brand-100 hover:bg-[#EDF5FF] md:h-[68px]'
          : 'border border-gray-200 hover:bg-gray-100'
      )}
    >
      {/* 좌측: 순위 및 키워드 */}
      <div
        className={cn(
          'flex min-w-0 flex-1 items-center',
          isMedal ? 'gap-2 md:gap-x-4' : 'gap-1 md:gap-x-3'
        )}
      >
        {rank > 0 && <RankBadge rank={rank} />}
        <span
          className={cn(
            'truncate',
            isMedal
              ? 'text-base font-bold text-brand-500 md:text-xl'
              : 'text-md font-semibold text-gray-800 md:text-lg'
          )}
        >
          {keyword}
        </span>
      </div>

      {/* 우측: 통계 및 타이머 */}
      <div className="flex flex-col-reverse gap-x-2 md:flex-row">
        <div className="flex justify-end gap-x-2 text-2xs font-regular text-gray-500 md:text-md">
          <div className='flex w-auto items-center justify-center gap-1 after:ml-2 after:h-1.5 after:w-px after:bg-gray-300 after:content-[""] md:w-16 md:after:content-none'>
            <WriteIcon className="block md:hidden" />
            {count}
          </div>
          <div className="flex w-auto items-center justify-center gap-1 md:w-16">
            <EyeOpenIcon className="block md:hidden" />
            {views}
          </div>
        </div>

        <CountdownTimer
          initialSeconds={timer}
          iconSize={cn('w-[22px] h-[22px]', isMedal ? 'md:w-7 md:h-7' : 'md:w-6 md:h-6')}
          textSize={cn('text-base', isMedal ? 'md:text-2xl' : 'md:text-lg')}
          boxSize="w-[120px]"
        />
      </div>
    </Link>
  );
}

{
  /* {currentExpand === rank && (
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
      )} */
}
