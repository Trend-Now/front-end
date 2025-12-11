import { axiosMyComments, axiosMyPosts, axiosMyScraps, axiosUserProfile } from '@/shared/api';
import { SSRBoundary } from '@/shared/ui';
import { MyPageHeader, MyPageNoticeBanner, MyPageTabs } from '@/widgets/mypage';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const cks = await cookies();

  const headerFns = [
    {
      queryKey: ['mypage'],
      queryFn: () => axiosUserProfile(cks.toString()),
    },
  ];

  const tabFns = [
    {
      queryKey: ['mycommentsCount'],
      queryFn: () => axiosMyComments(undefined, undefined, cks.toString()),
    },
    {
      queryKey: ['mypostsCount'],
      queryFn: () => axiosMyPosts(undefined, undefined, cks.toString()),
    },
    {
      queryKey: ['myscrapsCount'],
      queryFn: () => axiosMyScraps(undefined, undefined, cks.toString()),
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-[51.5rem] flex-col gap-y-2 px-4 py-3 md:gap-y-8 md:px-0 md:py-16">
      <div className="flex flex-col gap-y-6 md:gap-y-8">
        <div className="flex flex-col gap-y-4 md:gap-y-8">
          <SSRBoundary queryFns={headerFns}>
            <MyPageHeader />
          </SSRBoundary>
          <MyPageNoticeBanner />
        </div>
        <SSRBoundary queryFns={tabFns}>
          <MyPageTabs />
        </SSRBoundary>
      </div>
      {children}
    </div>
  );
}
