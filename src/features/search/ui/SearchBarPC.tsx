'use client';

import SearchInput from './SearchInput';
import SuggestionListPC from './SuggestionListPC';
import { useAutoSearch } from '../model/useAutoSearch';
import { useEffect, useRef, useState } from 'react';

export const SearchBarPC = () => {
  const { keyword, suggestions, handlers } = useAutoSearch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 컴포넌트 외부 클릭 시 자동완성 닫기 처리
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, handlers]);

  return (
    <div ref={wrapperRef} className="relative">
      <SearchInput
        value={keyword}
        onChange={(e) => {
          handlers.onChange(e);
          setIsDropdownOpen(true);
        }}
        onKeyDown={(e) => {
          handlers.onKeyDown(e);
          if (e.key === 'Enter') {
            setIsDropdownOpen(false);
          }
        }}
        onSearchClick={() => {
          handlers.onSubmit();
          setIsDropdownOpen(false);
        }}
        onFocus={() => setIsDropdownOpen(true)}
        hasKeyword={!!keyword}
        placeholder="원하는 검색어를 입력해주세요."
      />
      <SuggestionListPC
        suggestions={suggestions}
        keyword={keyword}
        isVisible={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
      />
    </div>
  );
};

export default SearchBarPC;
