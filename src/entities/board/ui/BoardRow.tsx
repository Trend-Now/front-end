import { PostInfo } from '@/shared/types';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/lib';
import { BadgeButton, EyeOpenIcon, Heart16, UserIcon } from '@/shared/ui';
import Link from 'next/link';
import dayjs from 'dayjs';

const rowVariants = cva(
  'flex flex-col md:flex-row px-2 items-start md:items-center gap-y-1.5 md:gap-2',
  {
    variants: {
      type: {
        noti: 'bg-brand-100 rounded-2xl py-3 md:py-5',
        normal: 'border-b border-gray-200 py-4 md:py-[18px]',
      },
    },
  }
);

interface BoardRowProps {
  /** 게시글 정보 */
  post: PostInfo;
  /** 게시글 종류 */
  type?: 'noti' | 'normal';
  /** 링크 prefix 명시 */
  basePath: string;
  /** 번호 표시 여부 (기본값 true) */
  showNumber?: boolean;
}

export default function BoardRow({
  post,
  type = 'normal',
  basePath,
  showNumber = true,
}: BoardRowProps) {
  return (
    <div className={cn(rowVariants({ type }))}>
      {/* 번호 */}
      {showNumber && (
        <div className="hidden w-12 shrink-0 text-center text-sm font-regular text-gray-500 md:block">
          {post.postId}
        </div>
      )}
      <BadgeButton show={type === 'noti'} variant="yellow">
        공지
      </BadgeButton>
      <div className="flex min-w-0 items-center gap-x-1.5 md:flex-1">
        <Link
          href={`${basePath}/post/${post.postId}`}
          className="truncate text-sm font-semibold text-gray-800 hover:underline md:text-md"
        >
          {post.title}
        </Link>
        <div className="text-xs text-gray-500">[{post.commentCount.toLocaleString()}]</div>
      </div>
      <div className="flex flex-row items-center gap-x-1.5 md:gap-x-2">
        <div className="flex shrink-0 items-center gap-x-1 after:ml-1.5 after:h-1.5 after:border-l after:border-gray-200 after:content-[''] md:w-[6.25rem] md:gap-x-1.5 md:after:hidden">
          <UserIcon className="h-4 w-4 md:h-5 md:w-5" maskId="boardrow-icon" />
          <div className="text-2xs text-gray-500 md:text-xs">{post.writer}</div>
        </div>
        <div className="flex shrink-0 items-center gap-x-1 text-center text-2xs font-regular text-gray-500 after:ml-1.5 after:h-1.5 after:border-l after:border-gray-200 after:content-[''] md:w-12 md:justify-center md:text-sm md:after:hidden">
          <EyeOpenIcon className="h-4 w-4 text-gray-500" />
          {post.viewCount.toLocaleString()}
        </div>
        <div className="flex shrink-0 items-center gap-x-1 text-center text-2xs font-regular text-gray-500 after:ml-1.5 after:h-1.5 after:border-l after:border-gray-200 after:content-[''] md:w-12 md:justify-center md:text-sm md:after:hidden">
          <Heart16 />
          {post.likeCount.toLocaleString()}
        </div>
        <div className="shrink-0 text-center text-2xs font-regular text-gray-500 md:w-12 md:text-sm">
          {dayjs(post.createdAt).format('MM.DD')}
        </div>
      </div>
    </div>
  );
}
