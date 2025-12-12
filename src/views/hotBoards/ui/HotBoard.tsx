'use client';

import { useQueryClient } from '@tanstack/react-query';
import { SSE } from '@/shared/api';
import { BoardSection } from '@/features/board';
import { useEffect } from 'react';

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

  return <BoardSection boardId={boardId} basePath={`/hotboard`} isHotBoard />;
}
