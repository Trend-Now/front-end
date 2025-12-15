import { ThreadWriteInput } from '@/features/thread';
import { ThreadContainer } from '@/widgets/thread';
import React from 'react';

interface ThreadProps {
  boardId: number;
}

export default function Thread({ boardId }: ThreadProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <ThreadWriteInput boardId={boardId} />
      <ThreadContainer />
    </div>
  );
}
