import { Trendnow } from '@/shared/ui';
import React from 'react';

export default function Footer() {
  return (
    <footer className="flex h-fit max-w-[1248px] rounded-t-[20px] bg-gray-900 px-6 py-8 md:rounded-t-[2rem] md:px-10 md:pb-16 md:pt-8">
      <div className="flex w-full flex-col gap-y-6 md:flex-row md:justify-between">
        <span className="flex flex-col items-start gap-y-3">
          <Trendnow color="white" className="h-6 md:h-8" />
          <span className="text-sm font-medium text-gray-400 md:text-base">트렌드나우</span>
        </span>
        <span className="text-sm font-regular text-gray-400">
          Copyright © 2025 Trendnow. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
