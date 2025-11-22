import { Top10 } from '@/shared/types';
import Link from 'next/link';
import TrendBarRowType from './TrendBarRowType';

export default function TrendBarRow({ boardId, rank, keyword, rankChangeType, diffRank }: Top10) {
  return (
    <Link href={`/hotboard/${boardId}`}>
      <div className="cursor-pointer rounded-xl px-1.5 py-0.5 transition duration-300 hover:bg-white/[8%]">
        <div className="flex items-center gap-x-1 py-1.5 pr-3 md:py-2">
          <div className="flex min-w-0 items-center gap-x-2 md:gap-x-3">
            <span className="h-6 w-6 text-center text-lg font-semiBold text-white md:h-7 md:w-7 md:text-xl">
              {rank}
            </span>
            <span className="flex-1 truncate text-md font-semiBold text-white md:text-lg">
              {keyword}
            </span>
          </div>
          <div className="flex items-center gap-x-0.5">
            <TrendBarRowType rankChangeType={rankChangeType} diffRank={diffRank} />
          </div>
        </div>
      </div>
    </Link>
  );
}
