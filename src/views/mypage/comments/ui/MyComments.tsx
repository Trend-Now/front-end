'use client';

import { axiosMyComments } from '@/shared/api';
import { MyCommentsResponse } from '@/shared/types';
import { Pagination } from '@/shared/ui';
import { MyCommentRow } from '@/widgets/mypage';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

const MyComments = () => {
  const pathname = usePathname();
  const params = useSearchParams();

  const page = Math.max(1, Number(params.get('page') ?? '1') || 1);

  const { data, isLoading } = useQuery({
    queryKey: ['mycomments', page],
    queryFn: () => axiosMyComments<MyCommentsResponse>(page, 20),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data.commentsInfoListDto.length === 0) {
    return (
      <div className="flex h-[25rem] items-center justify-center rounded-[1.25rem] bg-gray-100">
        <span className="text-sm font-medium text-gray-500">작성한 댓글이 없습니다.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4 md:gap-6">
      {/* 게시물 */}
      <div className="flex flex-col gap-y-2">
        <div className="hidden justify-between gap-2 border-b border-gray-200 px-2 pb-3 text-sm font-regular text-gray-500 md:flex">
          <div>게시글 제목/작성한 댓글</div>
          <div className="w-12 text-center">일자</div>
        </div>
        {data.commentsInfoListDto.map((item) => (
          <MyCommentRow
            key={item.commentId}
            boardId={item.boardId}
            postId={item.postId}
            title={item.postTitle}
            comment={item.content}
            created={item.createdAt}
          />
        ))}
      </div>
      {/* 페이지네이션 */}
      <Pagination
        currentPage={page}
        maxPage={data.totalPageCount || 1}
        count={5}
        getHref={(p) => `${pathname}?page=${p}`}
      />
    </div>
  );
};

export default MyComments;
