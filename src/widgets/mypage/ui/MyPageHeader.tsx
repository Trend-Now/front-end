'use client';

import { UserProfile } from '@/shared/types';
import { axiosUserProfile } from '@/shared/api';
import { SecondaryButton, Settings20 } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UserIcon from '../icons/UserIcon';

const MyPageHeader = () => {
  const { data } = useQuery({
    queryKey: ['mypage'],
    queryFn: () => axiosUserProfile<UserProfile>(),
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-x-4 md:gap-x-5">
        <UserIcon className="h-12 w-12 md:h-16 md:w-16" />
        <div className="flex flex-col justify-between">
          <div className="text-xl font-bold md:text-2xl md:font-semibold">{data?.nickname}</div>
          <div className="text-xs text-gray-500 md:text-base">{data?.email}</div>
        </div>
      </div>
      <SecondaryButton variant="gray" size="s">
        <div className="flex gap-1">
          <Settings20 />
          <div>프로필 편집</div>
        </div>
      </SecondaryButton>
    </div>
  );
};

export default MyPageHeader;
