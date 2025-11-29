import { Search, Trendnow } from '@/shared/ui/';
import Link from 'next/link';
import { Suspense } from 'react';
import { UserServerComponent } from '@/features/header';
import { SearchBarPC } from '@/features/search';
import SearchBarMobile from '@/features/search/ui/SearchBarMobile';

const Appbar = () => {
  return (
    <header className="fixed z-20 flex h-[var(--header-height)] w-full items-center justify-center bg-white px-8 md:h-[var(--header-height)] md:border-b md:border-gray-200">
      <div className="flex w-full max-w-[78rem] items-center justify-between gap-x-4">
        <Link href={`/`} className="cursor-pointer">
          <Trendnow className="h-5 md:h-7" />
        </Link>

        {/* PC용 검색바 */}
        <div className="hidden w-full max-w-[28.75rem] md:block">
          <Suspense>
            <SearchBarPC />
          </Suspense>
        </div>

        <div className="flex gap-2">
          {/* 모바일용 검색바 */}
          <div className="md:hidden">
            <SearchBarMobile />
          </div>
          <UserServerComponent />
        </div>
      </div>
    </header>
  );
};

export default Appbar;
