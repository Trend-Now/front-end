import { Trendnow } from '@/shared/ui/';
import Link from 'next/link';
import { Suspense } from 'react';
import { UserServerComponent } from '@/features/header';
import { SearchBarPC } from '@/features/search';

const Appbar = () => {
  return (
    <header className="fixed z-20 flex h-[60px] w-full items-center justify-center border-b border-gray-200 bg-white px-8 md:h-20">
      <div className="flex w-full max-w-[78rem] items-center justify-between gap-x-4">
        <Link href={`/`} className="cursor-pointer">
          <Trendnow className="h-5 md:h-7" />
        </Link>
        <Suspense>
          <SearchBarPC />
        </Suspense>
        <UserServerComponent />
      </div>
    </header>
  );
};

export default Appbar;
