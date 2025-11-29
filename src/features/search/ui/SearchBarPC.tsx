'use client';

import { SearchInput } from './SearchInput';
import { SuggestionListPC } from './SuggestionListPC';
import { useAutoSearch } from '../model/useAutoSearch';
import { useEffect, useRef } from 'react';

export const SearchBarPC = () => {
  const { keyword, suggestions, isOpen, handlers } = useAutoSearch();

  const wrapperRef = useRef<HTMLDivElement>(null);

  // 컴포넌트 외부 클릭 시 자동완성 닫기 처리
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        handlers.setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handlers]);

  return (
    <div ref={wrapperRef} className="relative hidden w-full max-w-[28.75rem] md:block">
      <SearchInput
        value={keyword}
        onChange={handlers.onChange}
        onKeyDown={handlers.onKeyDown}
        onSearchClick={() => handlers.onSubmit()}
        onFocus={() => handlers.setIsOpen(true)}
        hasKeyword={!!keyword}
        placeholder="원하는 검색어를 입력해주세요."
      />
      <SuggestionListPC
        suggestions={suggestions}
        keyword={keyword}
        isVisible={isOpen}
        onClose={() => handlers.setIsOpen(false)}
      />
    </div>
  );
};

export default SearchBarPC;
