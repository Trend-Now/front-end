import { SearchFixedBoardHeader } from '@/widgets/search';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <SearchFixedBoardHeader />
      {children}
    </div>
  );
}
