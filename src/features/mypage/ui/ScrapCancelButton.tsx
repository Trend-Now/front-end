'use client';

import { cn } from '@/shared/lib/';
import { axiosScrapPost } from '@/shared/api';
import { PostScrapResponse } from '@/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { InternalServerError } from '@/shared/error/error';
import { useLoginModalStore } from '@/shared/store';
import { ScrapFilledIcon } from '@/shared/ui';

interface ScrapToggleButtonProps {
  className: string;
  /**@param {number} postId 게시글 아이디 */
  postId: number;
  /**@param {number} postId 게시판 아이디 */
  boardId: number;
}

const ScrapCancelButton = ({ className, boardId, postId }: ScrapToggleButtonProps) => {
  const queryClient = useQueryClient();
  const { setLoginModalOpen } = useLoginModalStore();

  const { mutate } = useMutation({
    mutationFn: () => axiosScrapPost<PostScrapResponse>(boardId, postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['myscraps'] }),
    onError: (e) => {
      if (!(e instanceof AxiosError))
        throw new InternalServerError(
          '북마크를 취소하는 데 실패했습니다. 잠시 후 다시 시도해주세요.'
        );

      if (e.response?.status === 401) {
        setLoginModalOpen(true);
      } else {
        alert('예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });

  const handleScrap = () => {
    mutate();
  };

  return (
    <button
      onClick={handleScrap}
      className={cn(
        'flex h-6 w-6 items-center justify-center rounded-md border border-brand-500',
        className
      )}
    >
      <ScrapFilledIcon className="h-6 w-6" />
    </button>
  );
};

export default ScrapCancelButton;
