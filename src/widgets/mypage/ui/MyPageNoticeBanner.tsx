import Image from 'next/image';
import React from 'react';
import Chevron from '../icons/Chevron';

const MyPageNoticeBanner = () => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-brand-100 px-3 py-2 md:rounded-2xl md:px-4 md:py-3">
      <div className="flex items-center gap-[0.375rem]">
        <span className="relative aspect-square h-5 w-5 md:h-8 md:w-8">
          <Image src="/images/crown.gif" alt="gold" fill />
        </span>
        <div className="text-xs font-medium text-[#333333] md:text-md">
          더 많은 실시간 인기 검색어를 확인해보세요!
        </div>
      </div>
      <Chevron className="h-5 w-5 md:h-6 md:w-6" />
    </div>
  );
};

export default MyPageNoticeBanner;
