'use client';

// import { axiosUserProfile } from '@/shared/api';
// import { UserProfile } from '@/shared/types';
import { Search24, Hamburger24, DropdownMenu, DropdownMenuItem } from '@/shared/ui';
// import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { logoutAction } from '@/features/logout';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import UserIcon from './icon/UserIcon';

export default function MobileUser() {
  const queryClient = useQueryClient();
  const router = useRouter();

  // const { data: user, isError } = useQuery<UserProfile | null>({
  //   queryKey: ['userInfo'],
  //   queryFn: () => axiosUserProfile(),
  // });
  const menus = [
    { name: '내가 작성한 게시글', path: '/mypage/posts' },
    { name: '내가 작성한 댓글', path: '/mypage/comments' },
    { name: '스크랩한 게시글', path: '/mypage/scraps' },
    { name: '설정', path: '/mypage/settings' },
  ];

  return (
    <span className="flex items-center gap-2 md:hidden">
      <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
        <Search24 className="fill-gray-900" />
      </button>
      {/* 로그아웃인 상태에서는 "로그인" 문구 버튼 */}
      <DropdownMenu
        trigger={
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
            <Hamburger24 />
          </span>
        }
        className="w-fit gap-y-2 p-4"
      >
        <span className="flex h-10 w-fit items-center gap-x-2 rounded-full bg-gray-100 pl-2.5 pr-3.5">
          <UserIcon />
          <span className="text-nowrap text-md font-medium text-gray-800">Trendnow</span>
        </span>
        <hr className="h-px border-0 bg-gray-200" />
        <div className="flex flex-col gap-y-1">
          {menus.map((menu) => (
            <DropdownMenuItem
              key={menu.name}
              onClick={() => router.push(menu.path)}
              className="h-10 text-sm"
            >
              {menu.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem
            onClick={async () => {
              const confirmSignout = confirm('정말 로그아웃 하실 건가요?');

              if (confirmSignout) {
                await logoutAction();
                queryClient.clear();
                router.refresh();
              }
            }}
            className="h-10 text-sm"
          >
            로그아웃
          </DropdownMenuItem>
        </div>
      </DropdownMenu>
    </span>
  );
}
