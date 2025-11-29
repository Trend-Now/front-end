'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { axiosRealtimeTop10, SSE } from '@/shared/api';
import { SignalKeyword } from '@/shared/types';
import dayjs from 'dayjs';
import TrendBarRow from './TrendBarRow';

export default function TrendBar() {
  const [top10, setTop10] = useState<SignalKeyword>();
  const today = new Date(Date.now());

  useEffect(() => {
    const sseInstance = SSE.getInstance();

    const { eventSource } = sseInstance.getEventSource();

    eventSource.addEventListener('signalKeywordList', (e) => {
      const data: SignalKeyword = JSON.parse(e.data);
      setTop10(data);
    });
  }, []);

  useEffect(() => {
    (async () => await axiosRealtimeTop10<SignalKeyword>().then((res) => setTop10(res)))();
  }, []);

  return (
    <div className="flex h-fit w-full flex-col rounded-3xl bg-brand-500 md:sticky md:top-[104px]">
      <div className="flex flex-col gap-y-1.5 p-4 md:gap-y-2 md:p-5">
        <span className="text-sm font-medium text-brand-100 md:text-base md:font-semiBold">
          가장 뜨거운 실시간 인기 검색어
        </span>
        <span className="flex items-center gap-x-2">
          <span className="relative aspect-square h-10 w-10 object-cover md:h-[58px] md:w-[58px]">
            <Image src="/images/crown.gif" alt="trend" fill unoptimized />
          </span>
          <span className="font-himpun text-[32px]/[120%] font-regular text-white md:text-[44px]/[120%]">
            TOP 10
          </span>
        </span>
      </div>
      <div className="flex flex-col gap-y-2 md:gap-y-3">
        <div className="px-4 md:px-5">
          <span className="flex h-10 items-center rounded-xl bg-black/[0.16] px-3 py-2 text-sm font-medium text-white md:text-md">
            {dayjs(today).format('YYYY.MM.DD HH:mm 기준')}
          </span>
        </div>
        <div className="px-4 pb-5 md:px-5">
          <div className="flex flex-col gap-y-1 rounded-2xl bg-white/[8%] p-1 md:rounded-[1.25rem] md:p-2">
            {top10 &&
              top10.top10WithDiff?.map((item) => (
                <TrendBarRow
                  key={item.keyword}
                  boardId={item.boardId}
                  rank={item.rank}
                  keyword={item.keyword}
                  rankChangeType={item.rankChangeType}
                  diffRank={item.diffRank}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
