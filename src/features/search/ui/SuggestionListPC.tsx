import { highlightMatch } from '@/shared/lib';
import { AutoComplete } from '@/shared/types';
import Link from 'next/link';
import React from 'react';

interface SuggestionListPCProps {
  suggestions: AutoComplete[];
  keyword: string;
  isVisible: boolean;
  onClose: () => void; // 이름 변경: onSelect -> onClose (의미가 더 명확함)
}

export const SuggestionListPC = ({
  suggestions,
  keyword,
  isVisible,
  onClose,
}: SuggestionListPCProps) => {
  if (!isVisible || !suggestions || suggestions.length === 0) return null;

  return (
    <ul className="absolute left-0 top-full z-20 mt-2 flex w-full flex-col rounded-2xl bg-white px-2 py-3.5 shadow-[0_2px_24px_rgba(0,0,0,0.08)]">
      {suggestions.map((s) => (
        <li key={s.boardId} className="hover:bg-gray-50">
          <Link
            href={`/search?keyword=${encodeURIComponent(s.boardName)}`}
            className="block h-full w-full px-3 py-2 text-md"
            onClick={onClose}
          >
            {highlightMatch(s.boardName, keyword)}
          </Link>
        </li>
      ))}
    </ul>
  );
};
