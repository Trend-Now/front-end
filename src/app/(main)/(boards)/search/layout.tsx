import { SearchHeader, SearchTypeTabs } from '@/widgets/search';
import { SEARCH_TYPES } from '@/widgets/search/const';
import { ReactNode, Suspense } from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex-1 border-r border-gray-200 pr-8">
      <div className="flex flex-col gap-y-8">
        <Suspense>
          <SearchHeader />
        </Suspense>
        <Suspense>
          <SearchTypeTabs basePath="/search" types={SEARCH_TYPES} tabIndex={2} />
        </Suspense>
        {children}
      </div>
    </div>
  );
}
