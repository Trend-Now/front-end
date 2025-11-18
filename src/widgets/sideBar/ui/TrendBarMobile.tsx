'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Close from './icons/Close';
import TrendBar from './TrendBar';

export default function TrendBarMobile() {
  const [showTrendBar, setShowTrendBar] = useState(false);

  return (
    <span>
      <input type="checkbox" readOnly checked={showTrendBar} className="peer hidden" />
      {/* <span className="pointer-events-none flex w-[282px] translate-x-3 flex-col gap-y-4 rounded-[20px] bg-brand-500 p-4 opacity-0 transition-all duration-200 ease-out peer-checked:pointer-events-auto peer-checked:-translate-x-3 peer-checked:opacity-100">
        <div className="flex flex-col gap-y-1.5">
          <span className="text-sm font-medium text-brand-100">가장 뜨거운 실시간 인기 검색어</span>
          <span className="flex items-center gap-x-2">
            <Image
              src="/images/crown.gif"
              alt="trend"
              width={40}
              height={40}
              unoptimized
              className="aspect-square object-cover"
            />
            <span className="font-himpun text-[32px]/[120%] text-white">TOP 10</span>
          </span>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="rounded-xl bg-gray-900/[16%] px-3 py-2 text-sm font-medium text-white">
            2025.08.05 14:00 기준
          </div>
          <div className='flex flex-col gap-y-1 p-2 rounded-xl bg-white/[8%]'>
            <TrendBarRow boardId={0} rank={0} keyword={''} rankChangeType="" diffRank={0} />
          </div>
        </div>
      </span> */}
      <span className="pointer-events-none fixed bottom-20 right-4 w-[282px] translate-x-3 opacity-0 transition-all duration-200 ease-out peer-checked:pointer-events-auto peer-checked:-translate-x-3 peer-checked:opacity-100">
        <TrendBar />
      </span>
      <TrendBarMobileButton onClick={(open) => setShowTrendBar(open)} isOpen={showTrendBar} />
    </span>
  );
}

interface TrendBarMobileButtonProps {
  onClick: (open: boolean) => void;
  isOpen?: boolean;
}

function TrendBarMobileButton({ onClick, isOpen }: TrendBarMobileButtonProps) {
  return (
    <label className="fixed bottom-6 right-5">
      <input type="checkbox" onChange={(e) => onClick(e.target.checked)} className="hidden" />
      {isOpen ? (
        <span className="flex aspect-square h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-800 md:hidden">
          <Close />
        </span>
      ) : (
        <span className="flex aspect-square h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-brand-500 md:hidden">
          <Image
            src="/images/crown.gif"
            alt="trend"
            width={32}
            height={32}
            unoptimized
            className="aspect-square object-cover"
          />
        </span>
      )}
    </label>
  );
}
