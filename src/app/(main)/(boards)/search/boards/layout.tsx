import { SearchFixedBoardHeader } from '@/widgets/search';
import { ReactNode, Suspense } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <Suspense>
        <SearchFixedBoardHeader />
      </Suspense>
      {children}
    </div>
  );
}
