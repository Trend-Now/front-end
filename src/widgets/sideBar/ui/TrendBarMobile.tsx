'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Close from './icons/Close';
import TrendBar from './TrendBar';

export default function TrendBarMobile() {
  const [showTrendBar, setShowTrendBar] = useState(false);

  return (
    <>
      <input type="checkbox" readOnly checked={showTrendBar} className="peer hidden" />
      <span className="pointer-events-none fixed bottom-20 right-4 w-[282px] translate-x-3 opacity-0 transition-all duration-200 ease-out peer-checked:pointer-events-auto peer-checked:-translate-x-3 peer-checked:opacity-100">
        <TrendBar />
      </span>
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
