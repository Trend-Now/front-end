import React from 'react';
import AISummarySkeleton from './AISummarySkeleton';
import Image from 'next/image';
import AISummaryContent from './AISummaryContent';

interface AISummaryProps {
  /**@param {string} summaryText AI 요약 내용*/
  summaryText: string;
}

export default function AISummary({ summaryText }: AISummaryProps) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl bg-gray-900 md:rounded-[20px]">
      <Image
        src="/images/aisummarybg.gif"
        alt="AI 요약"
        quality={100}
        fill
        className="select-none object-cover"
        priority
      />
      {summaryText ? <AISummaryContent summaryText={summaryText} /> : <AISummarySkeleton />}
    </div>
  );
}
