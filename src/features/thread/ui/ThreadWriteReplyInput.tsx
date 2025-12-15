import { ReplyArrowIcon, SendArrowIcon } from '@/shared/ui';
import React from 'react';

export default function ThreadWriteReplyInput() {
  return (
    <div className="flex items-center gap-x-1">
      <span className="p-1">
        <ReplyArrowIcon />
      </span>
      <div className="flex flex-1 gap-x-1 rounded-full border border-gray-200 py-2 pl-4 pr-3">
        <input
          type="text"
          className="flex-1 text-sm text-gray-800 outline-none placeholder:text-gray-500"
          placeholder="답글을 작성해주세요."
        />
        <button className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 outline-none">
          <SendArrowIcon />
        </button>
      </div>
    </div>
  );
}
