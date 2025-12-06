'use client';

import { axiosScrapPost } from '@/shared/api';
import { InternalServerError } from '@/shared/error/error';
import { cn } from '@/shared/lib';
import { useLoginModalStore } from '@/shared/store';
import { PostScrapResponse } from '@/shared/types';
import { ScrapFilledIcon, ScrapOutlinedIcon } from '@/shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface BookmarkButtonProps {
  /**@param {number} postId 게시글 아이디 */
  postId: number;
  /**@param {number} postId 게시판 아이디 */
  boardId: number;
  /**@param {boolean} scraped 북마크 여부 */
  scraped: boolean;
  className?: string;
  iconClassName?: string;
}

export default function ScrapToggleButton({
  postId,
  boardId,
  scraped,
  className,
  iconClassName,
}: BookmarkButtonProps) {
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

      if (e.response?.status === 401) {
        setLoginModalOpen(true);
      } else {
        alert('예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });

  return (
    <button
      type="button"
      onClick={() => {
        mutate();
      }}
      aria-pressed={isScraped}
      aria-label={isScraped ? '스크랩 취소' : '스크랩'}
      className={cn(
        'flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border',
        isScraped ? 'border-brand-500' : 'border-gray-200',
        className
      )}
    >
      {isScraped ? (
        <ScrapFilledIcon className={iconClassName} />
      ) : (
        <ScrapOutlinedIcon className={iconClassName} />
      )}
    </button>
  );
}

//  <input
//    type="checkbox"
//    checked={isScraped}
//    onChange={() => {
//      mutate();
//    }}
//    className="flex h-10 w-10 cursor-pointer appearance-none items-center justify-center rounded-lg border border-gray-200 before:h-6 before:w-6 before:content-[url('/images/icons/icon_bookmark_24x24.svg')] checked:border-brand-500 checked:before:content-[url('/images/icons/icon_bookmark_active_24x24.svg')]"
//  />;
