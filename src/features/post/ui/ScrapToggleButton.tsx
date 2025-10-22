'use client';

import { axiosScrapPost } from '@/shared/api';
import { InternalServerError } from '@/shared/error/error';
import { useLoginModalStore } from '@/shared/store';
import { PostScrapResponse } from '@/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';

interface BookmarkButtonProps {
  /**@param {number} postId 게시글 아이디 */
  postId: number;
  /**@param {number} postId 게시판 아이디 */
  boardId: number;
  /**@param {boolean} scraped 북마크 여부 */
  scraped: boolean;
}

export default function ScrapToggleButton({ postId, boardId, scraped }: BookmarkButtonProps) {
  const queryClient = useQueryClient();
  const { setLoginModalOpen } = useLoginModalStore();

  const [isScraped, setIsScraped] = useState<boolean>(scraped);

  useEffect(() => {
    setIsScraped(scraped);
  }, [scraped]);

  const { mutate } = useMutation({
    mutationFn: () => axiosScrapPost<PostScrapResponse>(boardId, postId),
    onSuccess: (res) => {
      if (res.scrapAction === 'SCRAPPED') {
        setIsScraped(true);
      } else {
        setIsScraped(false);
      }
      queryClient.invalidateQueries({ queryKey: ['myscraps'] });
    },
    onError: (e) => {
      if (!(e instanceof AxiosError))
        throw new InternalServerError(
          '게시글을 북마크하는 데 실패했습니다. 잠시 후 다시 시도해주세요.'
        );

      if (e.response?.status === 401 || e.response?.status === 500) {
        setLoginModalOpen(true);
      } else {
        alert('예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });

  return (
    <input
      type="checkbox"
      checked={isScraped}
      onChange={() => {
        mutate();
      }}
      className="flex h-10 w-10 cursor-pointer appearance-none items-center justify-center rounded-lg border border-gray-200 before:h-6 before:w-6 before:content-[url('/images/icons/icon_bookmark_24x24.svg')] checked:border-brand-500 checked:before:content-[url('/images/icons/icon_bookmark_active_24x24.svg')]"
    />
  );
}
