import { ReactNode } from 'react';

export const highlightMatch = (text: string, keyword: string): ReactNode[] => {
  if (!keyword.trim()) {
    return [text];
  }

  const safeKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const regex = new RegExp(`(${safeKeyword})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <span key={i} className="font-bold text-black">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};
