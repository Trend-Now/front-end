import React from 'react';
import ThreadHeader from './ThreadHeader';
import ThreadContents from './ThreadContents';
import { ThreadWriteReplyInput } from '@/features/thread';
import ThreadReplyContainer from './ThreadReplyContainer';
import ThreadMoreRepliesTrigger from './ThreadMoreRepliesTrigger';

export default function ThreadContainer() {
  return (
    <div className="flex flex-col gap-y-1">
      <ThreadHeader />
      <div className="flex gap-x-3">
        <span className="flex w-8 justify-center pt-2">
          <hr className="h-full w-px bg-gray-200" />
        </span>
        <div className="flex flex-1 flex-col gap-y-4">
          <ThreadContents />
          <ThreadWriteReplyInput />
          <div className="flex flex-col gap-y-2">
            <ThreadReplyContainer />
            <ThreadReplyContainer />
            <ThreadMoreRepliesTrigger />
          </div>
        </div>
      </div>
    </div>
  );
}
