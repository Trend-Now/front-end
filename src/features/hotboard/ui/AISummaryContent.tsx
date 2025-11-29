import React, { useState } from 'react';
import aiStar from './lottie/aistar.json';
import Lottie from 'lottie-react';
import CloseButton from './CloseButton';
import { cn } from '@/shared/lib';

interface AISummaryContentProps {
  /**@param {string} summaryText AI 요약 내용*/
  summaryText: string;
}

export default function AISummaryContent({ summaryText }: AISummaryContentProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleSummaryToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col p-4 md:px-5 md:py-4">
      <div className="z-10 flex items-center justify-between">
        <span className="flex gap-x-1.5">
          <Lottie animationData={aiStar} className="h-5 w-5 md:h-6 md:w-6" />
          <span className="text-sm font-semiBold text-white md:text-md">
            지금 이 이슈, AI 요약으로 이해하기
          </span>
        </span>
        <CloseButton open={isOpen} onClick={handleSummaryToggle} />
      </div>
      <div
        className={cn(
          'z-10 overflow-hidden text-2xs font-medium text-white transition-all duration-200 ease-in-out md:text-xs',
          isOpen ? 'max-h-[500px] pt-3 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        {summaryText}
      </div>
    </div>
  );
}
