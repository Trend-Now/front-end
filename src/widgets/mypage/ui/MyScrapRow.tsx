import { ScrapToggleButton } from '@/features/scrap';
import { UserProfile20 } from '@/shared/ui';
import React from 'react';

interface MyScrapRowProps {
  /**@param {string} title 게시판 제목 */
  board: string;
  /**@param {string} title 게시글 제목 */
  title: string;
  /**@param {string} nickname 닉네임 */
  nickname: string;
  /**@param {number} views 조회수 */
  views: number;
  /**@param {number} likes 추천 */
  likes: number;
  /**@param {Date} created 일자 */
  created: Date;
  /**@param {number} comments 댓글 수 */
  comments: number;
}

const MyScrapRow = ({
  board,
  title,
  nickname,
  views,
  likes,
  created,
  comments,
}: MyScrapRowProps) => {
  const month = created.getMonth() + 1;
  const date = created.getDate();
  return (
    <div className="flex w-full justify-between border-b border-gray-200 px-2 py-4">
      <div className="flex items-center gap-4">
        <ScrapToggleButton size={'s'} />
        <div className="flex flex-col gap-1">
          <div className="text-xs font-medium text-brand-500">{board}</div>
          <div className="flex items-center gap-1.5">
            <div className="text-md font-semibold text-gray-800 hover:underline">{title}</div>
            <div className="text-xs text-gray-500">[{comments}]</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-center text-sm font-regular text-gray-500">
        <div className="flex w-[6.25rem] items-center justify-center gap-x-1.5">
          <UserProfile20 />
          <div>{nickname}</div>
        </div>
        <div className="w-12">{views.toLocaleString()}</div>
        <div className="w-12">{likes.toLocaleString()}</div>
        <div className="w-12">
          {month.toString().padStart(2, '0')}.{date.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default MyScrapRow;
