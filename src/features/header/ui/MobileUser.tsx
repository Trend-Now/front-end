'use client';

import { Search24, Hamburger24 } from '@/shared/ui';
import React from 'react';

export default function MobileUser() {
  return (
    <span className="flex items-center gap-2 md:hidden">
      <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
        <Search24 className="fill-gray-900" />
      </button>
      <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
        <Hamburger24 />
      </button>
    </span>
  );
}
