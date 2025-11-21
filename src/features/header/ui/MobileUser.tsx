'use client';

import { axiosUserProfile } from '@/shared/api';
import { UserProfile } from '@/shared/types';
import { Search24, Hamburger24, DropdownMenu, DropdownMenuItem } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { logoutAction } from '@/features/logout';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import UserIcon from './icon/UserIcon';
import { LoginModal } from '@/features/login';
import Link from 'next/link';

export default function MobileUser() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const { data, isError } = useQuery<UserProfile | null>({
    queryKey: ['userInfo'],
    queryFn: () => axiosUserProfile(),
  });

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
      {!data || isError ? (
        <span
          onClick={handleModalOpen}
          className="flex h-9 w-fit items-center justify-center text-nowrap rounded-full bg-gray-100 px-3 text-sm font-medium text-gray-800"
        >
          로그인
        </span>
      ) : (
        <DropdownMenu
          trigger={
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
              <Hamburger24 />
            </span>
          }
          className="w-fit gap-y-2 p-4"
        >
          <Link
            href={'/mypage'}
            className="flex h-10 w-fit items-center gap-x-2 rounded-full bg-gray-100 pl-2.5 pr-3.5"
          >
            <UserIcon />
            <span className="text-nowrap text-md font-medium text-gray-800">{data.nickname}</span>
          </Link>
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
      )}
      <LoginModal onClose={handleModalClose} open={isModalOpen} />
    </span>
  );
}
