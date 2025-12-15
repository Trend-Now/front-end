import { HeartIcon, ScrapOutlinedIcon } from '@/shared/ui';
import React from 'react';

export default function ThreadContents() {
  return (
    <div className="flex flex-1 flex-col gap-y-2 pr-6">
      <p className="whitespace-pre-wrap text-md font-regular text-gray-900">
        This experience taught me the importance of kindness and how small gestures can create
        lasting bonds.
      </p>
      <span className="flex items-center gap-x-2">
        <span className="flex items-center gap-x-1.5">
          <button className="flex gap-x-0.5 text-xs font-regular text-gray-400 outline-none hover:text-gray-600">
            <HeartIcon className="h-5 w-5" />
            31
          </button>
          <button className="flex gap-x-0.5 text-xs font-regular text-gray-400 outline-none hover:text-gray-600">
            <ScrapOutlinedIcon className="h-5 w-5" />
            24
          </button>
        </span>
        <span className="mx-0.5 h-2.5 w-px bg-gray-300" />
        <button className="text-xs font-regular text-gray-400 outline-none">답글달기</button>
      </span>
    </div>
  );
}
