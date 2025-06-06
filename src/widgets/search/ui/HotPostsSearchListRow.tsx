'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface HotPostsSearchListRowProps {
  /**@param {number} postId 게시글 번호 */
  postId: number;
  /**@param {string} hotKeyword 실시간 인기 검색어 */
  hotKeyword: string;
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

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=181-3227&t=zj7OkFIwEtvP1gm9-4
 */
export default function HotPostsSearchListRow({
  postId,
  hotKeyword,
  title,
  nickname,
  views,
  likes,
  created,
  comments,
}: HotPostsSearchListRowProps) {
  const pathname = usePathname();
  const month = created.getMonth() + 1;
  const date = created.getDate();

  return (
    <div className="flex items-center gap-x-2 px-2 py-[1.125rem]">
      <span className="flex flex-1 flex-col gap-y-1">
        <span className="text-xs font-medium text-brand-500">{hotKeyword}</span>
        <span className="flex items-center gap-x-2">
          <Link href={`${pathname}/post/${postId}`}>
            <span className="flex cursor-pointer gap-x-1.5">
              <span className="text-md font-semiBold text-gray-800 hover:underline">{title}</span>
              <span className="text-xs font-regular text-gray-500">
                [{comments.toLocaleString()}]
              </span>
            </span>
          </Link>
        </span>
      </span>
      <span className="flex w-[6.25rem] items-center gap-x-1.5">
        <Image
          src="/images/icons/icon_profile_88x88.png"
          alt="프로필 사진"
          width={20}
          height={20}
        />
        <span className="text-xs font-regular text-gray-500">{nickname}</span>
      </span>
      <span className="w-12 text-center text-sm font-regular text-gray-500">
        {views.toLocaleString()}
      </span>
      <span className="w-12 text-center text-sm font-regular text-gray-500">
        {likes.toLocaleString()}
      </span>
      <span className="w-12 text-center text-sm font-regular text-gray-500">
        {month.toString().padStart(2, '0')}.{date.toString().padStart(2, '0')}
      </span>
    </div>
  );
}
