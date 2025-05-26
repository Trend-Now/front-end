import Image from 'next/image';
import React from 'react';
import { Close } from './icons';

interface LoginModalProps extends React.RefAttributes<HTMLDivElement> {
  /**@param {boolean} open 모달 여닫음 여부 */
  open: boolean;
  /**@param {() => void} onDimClick 모달 배경 클릭 시 함수 */
  onClose: () => void;
}

export default function LoginModal({ open, onClose, ref }: LoginModalProps) {
  if (!open) return;

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={ref}
      className="absolute left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-black/[28%]"
      onClick={onClose}
    >
      <span
        onClick={handleModalClick}
        className="relative flex h-fit w-fit flex-col gap-y-8 rounded-[2rem] bg-white px-8 py-10"
      >
        <span onClick={onClose} className="absolute right-6 top-6 cursor-pointer">
          <Close />
        </span>
        <div className="flex w-full flex-col justify-center gap-y-8 py-8">
          <span className="text-center font-himpun text-5xl text-gray-800">Trendnow</span>
          <span className="flex flex-col">
            <span className="text-center">🔥 지금 가장 뜨거운 이슈, 단 5분만 열리는 토론방</span>
            <span className="text-center">
              3초만에 로그인하고 타이머가 멈추기 전에 한마디 남겨보세요.
            </span>
          </span>
        </div>
        <div className="flex w-full flex-col gap-y-3 px-8 *:select-none">
          <div className="flex cursor-pointer items-center justify-between rounded-full border border-gray-200 bg-white px-3 py-2">
            <Image
              src="/images/icons/icon_google_160x160.png"
              alt="구글 로그인"
              width={40}
              height={40}
            />
            <span className="text-md font-medium text-gray-800">구글 3초 로그인/회원가입</span>
            <span />
          </div>
          <div className="flex cursor-pointer items-center justify-between rounded-full bg-kakao px-3 py-2">
            <Image
              src="/images/icons/icon_kakao_160x160.png"
              alt="카카오 로그인"
              width={40}
              height={40}
            />
            <span className="text-md font-medium text-gray-800">카카오 3초 로그인/회원가입</span>
            <span />
          </div>
          <div className="flex cursor-pointer items-center justify-between rounded-full bg-naver px-3 py-2">
            <Image
              src="/images/icons/icon_naver_160x160.png"
              alt="네이버 로그인"
              width={40}
              height={40}
            />
            <span className="text-md font-medium text-white">네이버 3초 로그인/회원가입</span>
            <span />
          </div>
        </div>
      </span>
    </div>
  );
}
