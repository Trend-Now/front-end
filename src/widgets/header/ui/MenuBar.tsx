'use client';

import React from 'react';
import { House24 } from '@/shared/ui/';
import { usePathname, useRouter } from 'next/navigation';

const MenuBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menus = [
    { name: '자유게시판', path: '/board/11' },
    { name: '정치게시판', path: '/board/12' },
    { name: '연예게시판', path: '/board/13' },
  ];

  return (
    <div className="scrollbar-hidden flex justify-start overflow-x-scroll md:justify-center md:pb-10 md:pt-4">
      <ul className="flex items-center gap-x-2 rounded-full px-4 py-5 md:bg-gray-100 md:px-5 md:py-3">
        <li>
          <label className="group flex cursor-pointer items-center">
            <input
              checked={pathname === '/' || pathname.startsWith('/hotBoard')}
              type="radio"
              name="menu-bar"
              className="hidden appearance-none"
              onChange={() => router.push('/')}
            />
            <span className="flex items-center justify-center text-nowrap rounded-full bg-gray-100 px-5 py-1.5 text-base font-semiBold text-gray-500 hover:bg-gray-200/50 hover:transition-colors group-has-[:checked]:bg-gray-200 group-has-[:checked]:text-gray-900 md:bg-transparent md:py-2">
              <House24 className="h-5 fill-gray-500 group-has-[:checked]:fill-gray-800 md:h-6" />
            </span>
          </label>
        </li>
        {menus.map((item) => (
          <li key={item.name}>
            <label className="group flex cursor-pointer items-center">
              <input
                checked={pathname.startsWith(item.path)}
                type="radio"
                name="menu-bar"
                className="hidden appearance-none"
                onChange={() => router.push(item.path)}
              />
              <span className="flex items-center justify-center text-nowrap rounded-full bg-gray-100 px-5 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-200/50 hover:transition-colors group-has-[:checked]:bg-gray-200 group-has-[:checked]:text-gray-900 md:bg-transparent md:py-2 md:text-base md:font-semiBold">
                {item.name}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuBar;
