import { HeartIcon, ScrapOutlinedIcon } from '@/shared/ui';
import React from 'react';

export default function ThreadReplyContents() {
  return (
    <div className="flex flex-col gap-y-2 pl-8 pr-6">
      <p className="whitespace-pre-wrap text-sm font-regular text-gray-900">
        The warmth of their acceptance opened my eyes to the beauty of cultural diversity.
      </p>
      <span className="flex items-center gap-x-1.5">
        <button className="flex gap-x-0.5 text-xs font-regular text-gray-400 outline-none">
          <HeartIcon className="h-5 w-5" />
          31
        </button>
        <button className="flex gap-x-0.5 text-xs font-regular text-gray-400 outline-none">
          <ScrapOutlinedIcon className="h-5 w-5" />
          24
        </button>
      </span>
    </div>
  );
}
