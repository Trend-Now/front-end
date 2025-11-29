'use client';

import { CountdownTimer, DateDivider } from '@/shared/ui';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosHotBoardInfo, axiosHotBoardList, SSE } from '@/shared/api';
import { HotBoardInfoResponse, HotBoardResponse } from '@/shared/types';
import { BoardSection, BoardWriteButton } from '@/features/board';
import { AISummary, TimeUpModal } from '@/features/hotboard';
import { useEffect, useState } from 'react';

interface HotBoardProps {
  /**@param {number} boardId 게시판 Id */
  boardId: number;
}

export default function HotBoard({ boardId }: HotBoardProps) {
  const queryClient = useQueryClient();

  const [openTimeUpModal, setOpenTimeUpModal] = useState<boolean>(false);

  const { data: boardInfo } = useQuery({
    queryKey: ['hotBoardInfo', boardId],
    queryFn: () => axiosHotBoardInfo<HotBoardInfoResponse>(boardId),
    staleTime: 0, // 타이머를 위해 항상 새로운 데이터를 받아와야 하므로 0으로 설정
  });

  const { data: hotBoardRank } = useQuery({
    queryKey: ['hotBoardList'],
    queryFn: () => axiosHotBoardList<HotBoardResponse>(),
    select: (data) => data.boardInfoDtos.findIndex((item) => item.boardId === boardId),
  });

  useEffect(() => {
    const sseInstance = SSE.getInstance();

    const { eventSource } = sseInstance.getEventSource();

    eventSource.addEventListener('realtimeBoardTimeUp', (res) => {
      if (res.data.boardId === boardId)
        queryClient.invalidateQueries({ queryKey: ['hotBoardInfo', boardId] });
    });
  }, []);

  if (!boardInfo) return null;

  return (
    <div className="flex border-gray-200 bg-white md:border-r md:pr-8">
      <div className="flex w-full flex-col gap-y-4 md:gap-y-8">
        <div className="flex flex-col gap-y-4 md:gap-y-6">
          <DateDivider date={new Date()} background="black" />
          <div className="flex flex-col justify-between gap-y-4 md:mb-2 md:flex-row md:items-end">
            <span className="flex flex-col gap-y-1 md:gap-y-3">
              {hotBoardRank !== undefined && hotBoardRank > -1 && (
                <span className="text-sm font-semiBold text-brand-500 md:text-base">
                  현재 실시간 검색어 {hotBoardRank + 1}위
                </span>
              )}
              <span className="text-2xl font-bold text-gray-800 md:text-3xl">
                {boardInfo.boardName}
              </span>
            </span>
            <span className="flex flex-col items-start gap-y-1 md:items-end md:gap-y-2">
              <span className="text-2xs font-regular text-gray-500 md:text-sm">
                이 시간이 지나면 게시판이 사라져요!
              </span>
              <CountdownTimer
                textSize="text-2xl md:text-3xl"
                iconSize="h-8 w-8 md:h-10 md:w-10"
                initialSeconds={boardInfo.boardLiveTime}
                onTimeUp={() => setOpenTimeUpModal(true)}
              />
            </span>
          </div>
          <AISummary summaryText={boardInfo.summary} />
        </div>
        <div className="mt-2 flex items-center justify-end">
          <BoardWriteButton href={`/hotboard/${boardId}/write`} boardId={boardId} />
        </div>
        <BoardSection boardId={boardId} basePath={`/hotboard`} />
      </div>
      <TimeUpModal open={openTimeUpModal} />
    </div>
  );
}
