import { BOARD_MAP } from '@/shared/constants';
import { Heart16, View16 } from '@/shared/ui';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';

interface MyPostRowProps {
  /**@param {number} boardId 게시판 ID */
  boardId: number;
  /**@param {number} postId 게시글 ID */
  postId: number;
  /**@param {string} title 게시글 제목 */
  title: string;
  /**@param {number} views 조회수 */
  views: number;
  /**@param {number} likes 추천 */
  likes: number;
  /**@param {string} created 일자 */
  created: string;
  /**@param {number} comments 댓글 수 */
  comments: number;
}

const MyPostRow = ({ boardId, postId, title, views, likes, created, comments }: MyPostRowProps) => {
  const boardPath = [BOARD_MAP.free, BOARD_MAP.politics, BOARD_MAP.entertain].find(
    (board) => board.id === boardId
  )
    ? `/board/${boardId}/post/${postId}`
    : `/hotboard/${boardId}/community/post/${postId}`;

  return (
    <div className="flex w-full flex-col gap-y-1.5 border-b border-gray-200 p-3 text-center md:flex-row md:justify-between md:px-2 md:py-[1.125rem]">
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <div className="hidden w-12 text-sm text-gray-500 md:block">{postId}</div>
          <div className="flex items-center gap-1.5">
            <Link href={boardPath}>
              <div className="cursor-pointer text-sm font-semibold text-gray-800 hover:underline md:text-md">
                {title}
              </div>
            </Link>
            <div className="text-xs text-gray-500">[{comments}]</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-2xs text-gray-500 md:text-sm">
        <div className="flex items-center gap-x-1 after:ml-1 after:h-3 after:border-l after:border-gray-200 after:content-[''] md:block md:w-12 md:after:hidden">
          <span className="md:hidden">
            <View16 />
          </span>
          {views.toLocaleString()}
        </div>
        <div className="flex items-center gap-x-1 after:ml-1 after:h-3 after:border-l after:border-gray-200 after:content-[''] md:block md:w-12 md:after:hidden">
          <span className="md:hidden">
            <Heart16 />
          </span>
          {likes.toLocaleString()}
        </div>
        <div className="md:w-12">{dayjs(created).format('MM.DD')}</div>
      </div>
    </div>
  );
};

export default MyPostRow;
