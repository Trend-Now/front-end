import { highlightMatch } from '@/shared/lib';
import { AutoComplete } from '@/shared/types';
import Link from 'next/link';

interface SuggestionListMobileProps {
  suggestions: AutoComplete[];
  keyword: string;
  onClose: () => void;
}

export default function SuggestionListMobile({
  suggestions,
  keyword,
  onClose,
}: SuggestionListMobileProps) {
  if (!suggestions || suggestions.length === 0) return null;
  return (
    <ul className="flex w-full flex-col gap-3 px-3 py-4 text-xs">
      {suggestions.map((s) => (
        <li key={s.boardId} className="w-full">
          <Link
            href={`/search?keyword=${encodeURIComponent(s.boardName)}`}
            className="block h-full w-full rounded-xl px-3 py-2 text-md hover:bg-gray-50"
            onClick={onClose}
          >
            {highlightMatch(s.boardName, keyword)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
