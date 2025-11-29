import { DeleteAccountIcon } from '@/widgets/mypage/icons';
import React from 'react';

interface DeleteAccountButtonProps {
  /**@param {() => void} onClick 클릭 시 실행할 함수 */
  onClick: () => void;
}

// 회원탈퇴 버튼
const DeleteAccountButton = ({ onClick }: DeleteAccountButtonProps) => {
  return (
    <div
      className="flex w-full cursor-pointer items-center justify-center gap-1 rounded-xl border border-gray-200 bg-gray-100 py-3 pl-3 pr-4 md:w-fit"
      onClick={onClick}
    >
      <DeleteAccountIcon className="h-[18px] w-[18px] md:h-5 md:w-5" />
      <div className="text-sm font-semibold text-gray-500">회원탈퇴</div>
    </div>
  );
};

export default DeleteAccountButton;
