import { HotBoardList } from '@/entities/hotBoard';
import { DateDivider } from '@/shared/ui';
import { AdvCarousel } from '@/widgets/hotBoards';
// import Image from 'next/image';

export default function Home() {
  const ads = [{ img: '/images/ads/ad1.png', link: 'https://www.introduction.trendnow.me/' }];

  return (
    <div className="flex flex-col gap-y-12 border-gray-200 bg-white md:border-r md:pr-8">
      <AdvCarousel
        ads={ads}
        className="h-[120px] w-full rounded-2xl md:h-40 md:rounded-[1.25rem]"
      />
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-6">
          <DateDivider date={new Date()} background="black" />
          <div className="flex items-end">
            <div className="flex flex-col gap-y-1.5">
              <span className="text-xs font-regular text-gray-500 md:text-base">
                시간이 지나면 사라지는 실시간 게시판, 지금 참여하세요!
              </span>
              <span className="text-xl font-bold text-gray-800 md:text-3xl">
                실시간 인기 게시판
              </span>
            </div>
          </div>
        </div>
        <HotBoardList />
      </div>
    </div>
  );
}
