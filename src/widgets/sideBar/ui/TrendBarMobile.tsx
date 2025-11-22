'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Close from './icons/Close';
import TrendBar from './TrendBar';

export default function TrendBarMobile() {
  const [showTrendBar, setShowTrendBar] = useState(false);

  return (
    <>
      <div
        className={`fixed bottom-20 right-4 w-[282px] transition-all duration-200 ease-out md:hidden ${
          showTrendBar
            ? 'pointer-events-auto translate-x-0 opacity-100' // 열린 상태
            : 'pointer-events-none translate-x-3 opacity-0' // 닫힌 상태
        }`}
      >
        <TrendBar />
      </div>
      <TrendBarMobileButton onClick={(open) => setShowTrendBar(open)} isOpen={showTrendBar} />
    </>
  );
}

interface TrendBarMobileButtonProps {
  onClick: (open: boolean) => void;
  isOpen?: boolean;
}

function TrendBarMobileButton({ onClick, isOpen }: TrendBarMobileButtonProps) {
  return (
    <button
      onClick={() => onClick(!isOpen)}
      className={`fixed bottom-6 right-5 flex aspect-square h-12 w-12 cursor-pointer items-center justify-center rounded-full md:hidden ${isOpen ? 'bg-gray-800' : 'bg-brand-500'}`}
    >
      {isOpen ? (
        <Close />
      ) : (
        <Image
          src="/images/crown.gif"
          alt="trend"
          width={32}
          height={32}
          unoptimized
          className="aspect-square object-cover"
        />
      )}
    </button>
  );
}
