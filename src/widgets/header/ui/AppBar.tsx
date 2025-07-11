import { Trendnow } from '@/shared/ui/';
import Link from 'next/link';
import { User } from '@/features/header';
import { SearchBar } from '@/features/searchBar';
import { Suspense } from 'react';

const Appbar = () => {
  return (
    <header className="flex h-20 w-full items-center justify-center border-b border-gray-200 px-8">
      <div className="flex w-[78rem] items-center justify-between">
        <Link href={`/home`} className="cursor-pointer">
          <Trendnow />
        </Link>
        <Suspense>
          <SearchBar />
        </Suspense>
        <User />
      </div>
    </header>
  );
};

export default Appbar;
