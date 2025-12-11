'use client';

import { useQueryClient } from '@tanstack/react-query';
import { SSE } from '@/shared/api';
import { BoardSection } from '@/features/board';
import { useEffect } from 'react';
import { HotBoardHeader } from '@/widgets/hotBoards';

interface HotBoardProps {
  /**@param {number} boardId 게시판 Id */
  boardId: number;
}

export default function HotBoard({ boardId }: HotBoardProps) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const sseInstance = SSE.getInstance();

    const { eventSource } = sseInstance.getEventSource();

    eventSource.addEventListener('realtimeBoardTimeUp', (res) => {
      if (res.data.boardId === boardId)
        queryClient.invalidateQueries({ queryKey: ['hotBoardInfo', boardId] });
    });
  }, []);

  return (
    <div className="flex border-gray-200 bg-white md:border-r md:pr-8">
      <div className="flex w-full flex-col gap-y-4 md:gap-y-8">
        <HotBoardHeader boardId={boardId} />
        <BoardSection boardId={boardId} basePath={`/hotboard`} />
      </div>
    </div>
  );
}
