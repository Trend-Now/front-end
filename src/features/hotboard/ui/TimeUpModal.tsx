import { BackButton, Modal, SecondaryButton } from '@/shared/ui';
import Lottie from 'lottie-react';
import React from 'react';
import timeup from './lottie/timeup.json';
import Link from 'next/link';

interface TimeUpModalProps {
  open?: boolean;
}

export default function TimeUpModal({ open = false }: TimeUpModalProps) {
  if (!open) return null;

  return (
    <Modal>
      <div className="flex flex-col items-center gap-y-6 rounded-3xl bg-white p-6">
        <div className="flex flex-col items-center gap-y-2">
          <Lottie animationData={timeup} className="h-[84px] w-[84px]" />
          <div className="flex flex-col gap-y-3 py-4">
            <span className="text-center text-xl font-bold text-gray-900">
              타이머 만료로 게시판이 종료되었습니다
            </span>
            <span className="text-center text-sm font-regular text-gray-500">
              타이머 만료로 게시판 이용이 종료되었어요. <br />
              실시간 인기 검색어에서 새로운 게시판을 찾아 바로 참여해보세요.
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <BackButton />
          <Link href={'/'}>
            <SecondaryButton variant="gray" size="m" className="rounded-3xl">
              메인 페이지로 이동하기
            </SecondaryButton>
          </Link>
        </div>
      </div>
    </Modal>
  );
}
