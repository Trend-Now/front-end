import { ReplyArrowIcon } from '@/shared/ui';
import React from 'react';
import ThreadReplyHeader from './ThreadReplyHeader';
import ThreadReplyContents from './ThreadReplyContents';

export default function ThreadReplyContainer() {
  return (
    <div className="flex gap-x-1 rounded-xl bg-gray-100 p-2">
      <span className="p-1">
        <ReplyArrowIcon />
      </span>
      <div className="flex flex-1 flex-col gap-y-1">
        <ThreadReplyHeader />
        <ThreadReplyContents />
      </div>
    </div>
  );
}
