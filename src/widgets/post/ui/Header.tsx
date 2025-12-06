import { PostKebabButton } from '@/features/post';
import { ScrapToggleButton } from '@/features/post-bookmark';
import { LikeToggleButton } from '@/features/post-like';

import { cn } from '@/shared/lib';
import { PostDetail } from '@/shared/types';
import { UserIcon } from '@/shared/ui';
import dayjs from 'dayjs';

interface HeaderProps {
  /** 게시글 상세 정보 */
  post: PostDetail;

  /** 인기 게시판 여부 (선택) */
  isHotBoard?: boolean;

  /** 게시판 ID */
  boardId: number;

  /** 게시글 ID */
  postId: number;
}

export default function Header({ post, isHotBoard, boardId, postId }: HeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col border-b border-gray-200',
        'gap-y-4 pb-4', // 기본 스타일 (모바일)
        'md:gap-y-6 md:pb-5' // 태블릿 이상 스타일
      )}
    >
      <div
        className={cn(
          'flex',
          'flex-col-reverse justify-normal gap-y-4', // 기본 스타일 (모바일)
          'md:gay-y-0 md:flex-row md:justify-between' // 태블릿 이상 스타일
        )}
      >
        {/* 게시판 이름 & 제목 */}
        <div
          className={cn(
            'flex flex-col',
            'gap-y-2', // 기본 스타일 (모바일)
            'md:gap-y-3' // 태블릿 이상 스타일
          )}
        >
          <div
            className={cn(
              'font-semiBold',
              'text-sm', // 기본 스타일 (모바일)
              'md:text-lg', // 태블릿 이상 스타일
              isHotBoard ? 'text-brand-500' : 'text-gray-500'
            )}
          >
            {post.boardName}
          </div>
          <div className="text-2xl font-bold text-gray-800">{post.title}</div>
        </div>

        <div className="flex gap-x-2">
          <LikeToggleButton
            postId={postId}
            boardId={boardId}
            liked={post.liked}
            className={cn(
              'h-8 w-8', // 기본 스타일 (모바일)
              'md:h-10 md:w-10' // 태블릿 이상 스타일
            )}
            iconClassName={cn(
              'h-5 w-5', // 기본 스타일 (모바일)
              'md:h-6 md:w-6' // 태블릿 이상 스타일
            )}
          />
          <ScrapToggleButton
            postId={postId}
            boardId={boardId}
            scraped={post.scraped}
            className={cn(
              'h-8 w-8', // 기본 스타일 (모바일)
              'md:h-10 md:w-10' // 태블릿 이상 스타일
            )}
            iconClassName={cn(
              'h-5 w-5', // 기본 스타일 (모바일)
              'md:h-6 md:w-6' // 태블릿 이상 스타일
            )}
          />
          {post.myPost && <PostKebabButton />}
        </div>
      </div>

      <div
        className={cn(
          'flex justify-between',
          'flex-col gap-y-2', // 기본 스타일 (모바일)
          'md:flex-row md:gap-y-0' // 태블릿 이상 스타일
        )}
      >
        <div className="flex items-center gap-x-2">
          <UserIcon
            className={cn(
              'h-6 w-6', // 기본 스타일 (모바일)
              'md:h-7 md:w-7' // 태블릿 이상 스타일
            )}
            maskId="post_icon"
          />
          <span
            className={cn(
              'font-medium text-gray-500',
              'text-sm', // 기본 스타일 (모바일)
              'md:text-base' // 태블릿 이상 스타일
            )}
          >
            {post.writer}
          </span>
        </div>

        <ul
          className={cn(
            'flex items-center whitespace-nowrap font-regular text-gray-500',
            'text-2xs', // 기본 스타일 (모바일)
            'md:text-sm' // 태블릿 이상 스타일
          )}
        >
          <li className="flex items-center gap-x-1.5 rounded-md bg-gray-100 px-2.5 py-1">
            <span>댓글</span>
            <span>{post.commentCount.toLocaleString()}</span>
          </li>
          <li className="flex items-center gap-x-1.5 before:ml-2 before:inline-block before:h-3 before:w-[1px] before:bg-gray-200">
            <span>조회수</span>
            <span>{post.viewCount.toLocaleString()}</span>
          </li>
          <li className="flex items-center gap-x-1.5 before:ml-2 before:inline-block before:h-3 before:w-[1px] before:bg-gray-200">
            <span>추천</span>
            <span>{post.likeCount.toLocaleString()}</span>
          </li>
          <li className="flex items-center gap-x-1.5 before:ml-2 before:inline-block before:h-3 before:w-[1px] before:bg-gray-200">
            <span>작성일</span>
            <time dateTime={post.createdAt}>{dayjs(post.createdAt).format('YYYY.MM.DD')}</time>
          </li>
        </ul>
      </div>
    </div>
  );
}
