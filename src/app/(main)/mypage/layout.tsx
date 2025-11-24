import { MyPageHeader, MyPageNoticeBanner, MyPageTabs } from '@/widgets/mypage';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[51.5rem] flex-col gap-y-2 px-4 py-3 md:gap-y-8 md:px-0 md:py-16">
      <div className="flex flex-col gap-y-6 md:gap-y-8">
        <div className="flex flex-col gap-y-4 md:gap-y-8">
          <MyPageHeader />
          <MyPageNoticeBanner />
        </div>
        <MyPageTabs />
      </div>
      {children}
    </div>
  );
}
