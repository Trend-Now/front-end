import { RankChangeType } from '@/shared/types';
import { Up, Down, Bar } from './icons';

interface TrendBarRowTypeProps {
  /**@param {RankChangeType} rankChangeType 키워드의 순위 변동 유형 */
  rankChangeType: RankChangeType;
  /**@param {number} diffRank 키워드의 순위 변동 크기 */
  diffRank: number;
}

export default function TrendBarRowType({ rankChangeType, diffRank }: TrendBarRowTypeProps) {
  switch (rankChangeType) {
    case RankChangeType.UP:
      return (
        <>
          <Up className="h-5 w-5 md:h-6 md:w-6" />
          <span className="text-base font-medium text-white">{diffRank}</span>
        </>
      );
    case RankChangeType.DOWN:
      return (
        <>
          <Down className="h-5 w-5 md:h-6 md:w-6" />
          <span className="text-base font-medium text-[#1056AC]">{diffRank}</span>
        </>
      );
    case RankChangeType.SAME:
      return (
        <>
          <Bar className="h-5 w-5 md:h-6 md:w-6" />
        </>
      );
    case RankChangeType.NEW:
      return (
        <>
          <span className="flex h-5 items-center rounded-[4px] bg-white/[16%] px-1.5 text-3xs font-semiBold text-white md:h-6 md:rounded-lg md:px-2 md:text-2xs">
            NEW
          </span>
        </>
      );
  }
}
