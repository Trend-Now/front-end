'use client';

import React from 'react';
import { PencilIcon, PrimaryButton } from '@/shared/ui';
import { axiosCheckWriteCooldown } from '@/shared/api';
import { WriteCooldownResponse } from '@/shared/types';
import { useRouter } from 'next/navigation';
import { useLoginModalStore } from '@/shared/store';

interface BoardWriteButtonProps {
  href: string;
  boardId: number;
}

export default function BoardWriteButton({ href, boardId }: BoardWriteButtonProps) {
  const router = useRouter();
  const { setLoginModalOpen } = useLoginModalStore();

  const handleWriteButton = async () => {
    try {
      const result = await axiosCheckWriteCooldown<WriteCooldownResponse>(boardId);

      if (result.canWritePost) {
        router.push(href);
      } else {
        alert(`${result.cooldownSeconds}초 후 게시글 작성이 가능합니다.`);
      }
    } catch {
      setLoginModalOpen(true);
      return;
    }
  };

  return (
    <PrimaryButton
      variant="primary"
      size="s"
      className="pl-3 md:h-11 md:px-6 md:pl-4 md:text-sm"
      onClick={handleWriteButton}
    >
      <span className="flex items-center gap-x-1 md:gap-x-1.5">
        <PencilIcon className="h-5 w-5 text-white md:h-6 md:w-6" />
        글쓰기
      </span>
    </PrimaryButton>
  );
}
