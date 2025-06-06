'use client';

import { PrimaryButton, SecondaryButton } from '@/shared/ui';
import React from 'react';
import { searchTypes } from '../const';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function SearchTypeTabs() {
  const router = useRouter();
  const searchType = usePathname().split('/');
  const keyword = useSearchParams().get('keyword');

  const currentTab = searchType[searchType.length - 1];

  return (
    <div className="flex gap-x-2">
      {searchTypes.map((item, idx) =>
        item.pathname === currentTab ? (
          <PrimaryButton key={idx} variant="black" size="s" className="text-nowrap rounded-full">
            {item.label}
          </PrimaryButton>
        ) : (
          <SecondaryButton
            key={idx}
            variant="gray"
            size="s"
            className="text-nowrap rounded-full"
            onClick={() => router.push(`/search/${item.pathname}?keyword=${keyword}`)}
          >
            {item.label}
          </SecondaryButton>
        )
      )}
    </div>
  );
}
