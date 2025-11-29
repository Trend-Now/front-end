'use client';

import { useState } from 'react';
import { DropdownMenu, DropdownMenuItem, Hamburger24, PrimaryButton } from '@/shared/ui/';
import { LoginModal } from '@/features/login';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { axiosUserProfile } from '@/shared/api';
import { UserProfile } from '@/shared/types';
import { logoutAction } from '@/features/logout';
import UserProfileButton from './UserProfileButton';

export default function User() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const { data: user, isError } = useQuery<UserProfile | null>({
    queryKey: ['userInfo'],
    queryFn: () => axiosUserProfile(),
  });

  // 로그인 안되어있을때
  if (!user || isError) {
    return (
      <span className="hidden md:block">
        <PrimaryButton
          variant="gray"
          size="l"
          className="h-10 select-none text-nowrap rounded-full px-3.5 py-2.5 text-base font-medium text-gray-800"
          onClick={handleModalOpen}
        >
          로그인
        </PrimaryButton>
        <LoginModal onClose={handleModalClose} open={isModalOpen} />
      </span>
    );
  }
  return (
    <div className="hidden gap-2 md:flex">
      <UserProfileButton
        name={user?.nickname}
        maskId="user_button_28"
        containerClassName="gap-x-2.5"
        iconClassName="h-7 w-7"
        textClassName="text-base"
      />

      <DropdownMenu
        trigger={
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <Hamburger24 />
          </span>
        }
        className="w-[12.5rem] p-4"
      >
        <DropdownMenuItem onClick={() => router.push('/mypage/posts')} className="text-base">
          내가 작성한 게시글
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/mypage/comments')} className="text-base">
          내가 작성한 댓글
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/mypage/scraps')} className="text-base">
          스크랩한 게시글
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/mypage/settings')} className="text-base">
          설정
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            const confirmSignout = confirm('정말 로그아웃 하실 건가요?');

            if (confirmSignout) {
              await logoutAction();
              queryClient.clear();
              router.refresh();
            }
          }}
          className="text-base"
        >
          로그아웃
        </DropdownMenuItem>
      </DropdownMenu>
    </div>
  );
}
