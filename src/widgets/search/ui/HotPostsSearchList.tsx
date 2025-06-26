import React from 'react';
import HotPostsSearchListRow from './HotPostsSearchListRow';
import { RealtimePost } from '@/shared/types';

export default function HotPostsSearchList({ posts }: { posts: RealtimePost[] }) {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-2 border-b border-gray-200 px-2 pb-3 *:text-sm *:font-regular *:text-gray-500">
        <span className="flex-1 text-left">게시글 제목</span>
        <span className="w-[6.25rem] text-center">닉네임</span>
        <span className="w-12 text-center">조회수</span>
        <span className="w-12 text-center">추천</span>
        <span className="w-12 text-center">일자</span>
      </div>
      {posts.map((post) => (
        <HotPostsSearchListRow key={post.boardId} post={post} />
      ))}
    </div>
  );
}
