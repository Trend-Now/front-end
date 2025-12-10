'use client';
import { axiosPost } from '@/shared/api';
import type { PostDetailResponse } from '@/shared/types';
import { Comments } from '@/entities/comments';
import { Content, Header } from '@/widgets/post';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/shared/lib';

interface PostProps {
  /** 게시글 ID */
  postId: number;

  /** 게시판 ID */
  boardId: number;

  /** 인기 게시판 여부 */
  isHotBoard?: boolean;
}

export default function Post({ postId, boardId, isHotBoard = false }: PostProps) {
  const { data: post } = useQuery({
    queryKey: ['postDetail', boardId, postId],
    queryFn: () => axiosPost<PostDetailResponse>(boardId, postId),
    select: (data) => data.data.postInfoDto,
  });

  if (!post) return null;

  return (
    <div
      className={cn(
        'flex bg-white py-3', // 기본 스타일 (모바일)
        'md:border-r md:border-gray-200 md:py-0 md:pr-8' // 태블릿 이상 스타일
      )}
    >
      <div className="flex w-full flex-col gap-y-8">
        <Header post={post!} isHotBoard={isHotBoard} boardId={boardId} postId={postId} />
        <Content post={post!} />
        <Comments boardId={boardId} postId={postId} />
      </div>
    </div>
  );
}
