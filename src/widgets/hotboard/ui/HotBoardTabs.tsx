'use client';

import React from 'react';
import { HOTBOARD_TAB_KEYS } from '../const';
import { Chat } from '@/shared/ui';
import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';

interface HotBoardTabsProps {
  boardId: number;
}

export default function HotBoardTabs({ boardId }: HotBoardTabsProps) {
  const currentTab = useSelectedLayoutSegment();

  return (
    <ul className="flex gap-x-1 border-b border-gray-200">
      {Object.entries(HOTBOARD_TAB_KEYS).map((item, idx) =>
        currentTab === item[0] ? (
          <Link key={idx} href={`/hotboard/${boardId}/${item[0]}`}>
            <li className="flex cursor-pointer items-center gap-x-1 border-b-2 border-b-gray-900 px-3 py-2 text-sm font-semiBold text-gray-900">
              <Chat className="fill-gray-900" />
              {item[1]}
            </li>
          </Link>
        ) : (
          <Link key={idx} href={`/hotboard/${boardId}/${item[0]}`}>
            <li
              key={idx}
              className="flex cursor-pointer items-center gap-x-1 px-3 py-2 text-sm font-semiBold text-gray-500"
            >
              <Chat className="fill-gray-500" />
              {item[1]}
            </li>
          </Link>
        )
      )}
    </ul>
  );
}
