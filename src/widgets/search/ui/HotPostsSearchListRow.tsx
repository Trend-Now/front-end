'use client';

import React from 'react';
import Image from 'next/image';
// import { usePathname } from 'next/navigation';
// import Link from 'next/link';
import { RealtimePost } from '@/shared/types';
import dayjs from 'dayjs';

interface HotPostsSearchListRowProps {
  /**@param {RealtimePost} post 게시글 정보 */
  post: RealtimePost;
}

/**
 * @see https://www.figma.com/design/2ks26SvLcpmEHmzSETR8ky/Trend-Now_Design-File?node-id=181-3227&t=zj7OkFIwEtvP1gm9-4
 */

export default function HotPostsSearchListRow({ post }: HotPostsSearchListRowProps) {
  // const pathname = usePathname();

  return (
    <div className="flex items-center gap-x-2 px-2 py-[1.125rem]">
      <span className="flex flex-1 flex-col gap-y-1">
        <span className="text-xs font-medium text-brand-500">{post.boardName}</span>
        <span className="flex items-center gap-x-2">
          {/* 임시로 Link태그 삭제 */}
          <div>
            <span className="flex cursor-pointer gap-x-1.5">
              <span className="text-md font-semiBold text-gray-800 hover:underline">
                {post.title}
              </span>
              <span className="text-xs font-regular text-gray-500">
                [{post.commentCount.toLocaleString()}]
              </span>
            </span>
          </div>
        </span>
      </span>
      <span className="flex w-[6.25rem] items-center gap-x-1.5">
        <Image
          src="/images/icons/icon_profile_88x88.png"
          alt="프로필 사진"
          width={20}
          height={20}
        />
        <span className="text-xs font-regular text-gray-500">{post.writer}</span>
      </span>
      <span className="w-12 text-center text-sm font-regular text-gray-500">
        {post.viewCount.toLocaleString()}
      </span>
      <span className="w-12 text-center text-sm font-regular text-gray-500">
        {post.likeCount.toLocaleString()}
      </span>
      <span className="w-12 text-center text-sm font-regular text-gray-500">
        {dayjs(post.createAt).format('MM.DD')}
      </span>
    </div>
  );
}
