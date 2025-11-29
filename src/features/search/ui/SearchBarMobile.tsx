'use client';
import SearchModal from '@/features/search/ui/SearchModal';
import { Search } from '@/shared/ui';
import { useState } from 'react';

const SearchBarMobile = () => {
  // 모바일 검색 모달 열림 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100"
        onClick={() => setIsModalOpen(true)}
      >
        <Search className="h-5 w-5 text-gray-900" />
      </button>
      {isModalOpen && <SearchModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default SearchBarMobile;
