'use client';

import Image from 'next/image';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { Bar, Down, Up } from './icons';
import { RankChangeType, SignalKeyword, Top10 } from '../model';
import { EventSource } from 'eventsource';

export default function TrendBar() {
  const [top10, setTop10] = useState<SignalKeyword>();
  const today = new Date(top10?.now || Date.now());

  const eventSource = useMemo(
    () => new EventSource(`http://13.124.181.116:8080/api/v1/subscribe?clientId=12345`),
    []
  );

  eventSource.addEventListener('signalKeywordList', (e) => {
    const receivedData = e.data;

    setTop10(receivedData);
  });

  useEffect(() => {
    return () => eventSource.close();
  }, [eventSource]);

  return (
    <div className="flex flex-col gap-y-7 rounded-3xl bg-brand-500 p-5">
      <div className="flex flex-col gap-y-6">
        <span className="w-fit rounded-xl bg-gray-800 px-3 py-1.5 text-base font-medium text-white">
          {`${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`}
        </span>
        <span className="flex w-fit flex-col gap-y-1.5">
          <span className="text-lg font-semiBold text-brand-100">
            가장 뜨거운 실시간 인기 검색어
          </span>
          <span className="flex w-fit items-center gap-x-1.5">
            <Image
              src="/images/crown.gif"
              alt="trend"
              width={58}
              height={58}
              className="aspect-square object-cover"
            />
            <span className="font-himpun text-[2.75rem]/[120%] text-white">TOP 10</span>
          </span>
        </span>
      </div>
      <div className="flex flex-col gap-y-1 rounded-[1.25rem] bg-white/[8%] p-3">
        {top10 &&
          top10.top10WithDiff &&
          top10.top10WithDiff.map((item) => (
            <Top10Row
              key={item.keyword}
              rank={item.rank}
              keyword={item.keyword}
              rankChangeType={item.rankChangeType}
              previousRank={item.previousRank}
            />
          ))}
      </div>
    </div>
  );
}

const Top10Row = memo(function Top10Row({ rank, keyword, rankChangeType, previousRank }: Top10) {
  return (
    <div className="flex cursor-pointer justify-between rounded-xl py-2 pr-3 hover:bg-white/[16%] hover:pl-3">
      <div className="flex gap-x-3">
        <span className="flex h-7 w-7 items-center justify-center text-xl font-semiBold text-white">
          {rank}
        </span>
        <span className="flex items-center justify-center text-lg font-semiBold text-white">
          {keyword}
        </span>
      </div>
      {previousRank ? (
        rankChangeType === RankChangeType.UP ? (
          <div className="flex items-center gap-x-0.5">
            <Up />
            <span className="text-base font-medium text-white">
              {Math.abs(previousRank - rank)}
            </span>
          </div>
        ) : rankChangeType === RankChangeType.DOWN ? (
          <div className="flex items-center gap-x-0.5">
            <Down />
            <span className="text-base font-medium text-[#1056AC]">
              {Math.abs(previousRank - rank)}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-x-0.5">
            <Bar />
          </div>
        )
      ) : (
        <div className="flex items-center gap-x-0.5">
          <span className="text-base font-medium text-white">NEW</span>
        </div>
      )}
    </div>
  );
});

Top10Row.displayName = 'Top10Row';
