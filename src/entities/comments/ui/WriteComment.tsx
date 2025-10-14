import React, { useState } from 'react';
import { PrimaryButton } from '@/shared/ui';
import { CommentIcon } from '../icons';
import { axiosWriteComment } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RequireLoginModal } from '@/features/login';

interface WriteCommentProps {
  /**@param {number} boardId 게시판 아이디 */
  boardId: number;
  /**@param {number} postId 게시글 아이디 */
  postId: number;
}

export default function WriteComment({ boardId, postId }: WriteCommentProps) {
  const queryClient = useQueryClient();

  const [commentText, setCommentText] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const { mutate } = useMutation({
    mutationFn: () => axiosWriteComment<boolean>(boardId, postId, commentText),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', boardId, postId] });
      setCommentText('');
    },
    onError: () => {
      setIsLoginModalOpen(true);
    },
  });

  const handleSaveComment = () => {
    if (!commentText.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    mutate();
  };

  return (
    <>
      <div className="flex flex-col gap-y-2">
        <span className="flex items-center gap-x-1.5">
          <CommentIcon />
          <span className="select-none text-md font-semiBold text-gray-800">댓글 작성</span>
        </span>
        <div className="flex flex-col gap-y-2 rounded-2xl border border-gray-300 bg-white p-4">
          <textarea
            value={commentText}
            onChange={handleCommentChange}
            placeholder="댓글을 작성해주세요."
            className="w-full resize-none text-md font-medium text-gray-800 field-sizing-content placeholder:text-gray-500 focus:outline-none"
          ></textarea>
          <div className="flex justify-end">
            <PrimaryButton
              variant={commentText.length > 0 ? 'black' : 'gray'}
              size="m"
              disabled={!commentText}
              onClick={handleSaveComment}
            >
              등록
            </PrimaryButton>
          </div>
        </div>
      </div>
      <RequireLoginModal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
