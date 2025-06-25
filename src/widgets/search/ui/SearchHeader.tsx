'use client';
import { useSearchParams } from 'next/navigation';

const SearchHeader = () => {
  const keyword = useSearchParams().get('keyword');

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-lg font-semiBold text-gray-500">총 1,402개의 검색결과</span>
      <span className="text-4xl font-bold text-gray-800">{keyword}</span>
    </div>
  );
};

export default SearchHeader;
