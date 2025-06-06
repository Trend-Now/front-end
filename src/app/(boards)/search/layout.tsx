'use client';

import { SearchTypeTabs } from '@/widgets/search';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const keyword = useSearchParams().get('keyword');

  return (
    <div className="flex-1 border-r border-gray-200 pr-8">
      <div className="flex flex-col gap-y-8">
        <span className="flex flex-col gap-y-3">
          <span className="text-lg font-semiBold text-gray-500">총 1,402개의 검색결과</span>
          <span className="text-4xl font-bold text-gray-800">{keyword}</span>
        </span>
        <SearchTypeTabs />
        {children}
      </div>
    </div>
  );
}
