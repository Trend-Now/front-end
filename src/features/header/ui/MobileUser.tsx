'use client';

// import { axiosUserProfile } from '@/shared/api';
// import { UserProfile } from '@/shared/types';
import { Search, Hamburger24, PrimaryButton } from '@/shared/ui';
// import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Close from './icon/Close';
import SignOut from './icon/SignOut';

export default function MobileUser() {
  const [sideBarOpen, setSidebarOpen] = useState(false);

  // const { data: user, isError } = useQuery<UserProfile | null>({
  //   queryKey: ['userInfo'],
  //   queryFn: () => axiosUserProfile(),
  // });

  const handleSideBarOpen = () => {
    setSidebarOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleSideBarClose = () => {
    setSidebarOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <span className="flex items-center gap-2 md:hidden">
      <button
        onClick={handleSideBarOpen}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100"
      >
        <Hamburger24 />
      </button>
      <input type="checkbox" readOnly checked={sideBarOpen} className="peer absolute h-0 w-0" />
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleSideBarClose();
          }
        }}
        className="pointer-events-none fixed inset-0 z-40 h-full w-full bg-gray-900/30 opacity-0 transition-opacity duration-200 ease-out peer-checked:pointer-events-auto peer-checked:opacity-100"
      />
      <span className="fixed bottom-14 right-0 top-14 z-50 flex w-72 translate-x-full flex-col gap-y-2 rounded-l-3xl border bg-white p-4 transition-transform peer-checked:-translate-x-0">
        <div className="flex justify-end py-1.5">
          <button onClick={handleSideBarClose}>
            <Close />
          </button>
        </div>
        <hr className="h-px border-0 bg-gray-200" />
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-y-1">
            <MenuRow text="내가 작성한 게시글" />
            <MenuRow text="내가 작성한 댓글" />
            <MenuRow text="스크랩한 게시글" />
            <MenuRow text="설정" />
          </div>
          <PrimaryButton variant="gray" size="m" className="h-10 w-fit gap-x-1.5 rounded-full p-3">
            <SignOut />
            로그아웃
          </PrimaryButton>
        </div>
      </span>
    </span>
  );
}

interface MenuRowProps {
  text: string;
}

function MenuRow({ text }: MenuRowProps) {
  return (
    <div className="flex h-10 cursor-pointer items-center rounded-xl text-sm font-medium text-gray-800 hover:bg-gray-100">
      {text}
    </div>
  );
}
