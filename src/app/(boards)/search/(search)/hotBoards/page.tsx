'use client';

import { HotBoards } from '@/views/search';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function Page() {
  const keyword = useSearchParams().get('keyword');

  return <HotBoards keyword={keyword || undefined} />;
}
