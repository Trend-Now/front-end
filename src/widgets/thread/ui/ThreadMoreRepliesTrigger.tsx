import { ChevronDown } from '@/shared/ui';
import React from 'react';

export default function ThreadMoreRepliesTrigger() {
  return (
    <button className="flex items-center gap-x-1">
      <ChevronDown />
      <span className="text-xs font-regular leading-none text-gray-900">
        36개의 코멘트 전체보기
      </span>
    </button>
  );
}
