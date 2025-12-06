import { getQueryClient } from '@/providers/queryClient';
import { axiosMyComments, axiosMyPosts, axiosMyScraps, axiosUserProfile } from '@/shared/api';
import { MyPageHeader, MyPageNoticeBanner, MyPageTabs } from '@/widgets/mypage';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  const cks = await cookies();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['mypage'],
      queryFn: () => axiosUserProfile(cks.toString()),
    }),
    queryClient.prefetchQuery({
      queryKey: ['mycommentsCount'],
      queryFn: () => axiosMyComments(),
    }),
    queryClient.prefetchQuery({
      queryKey: ['mypostsCount'],
      queryFn: () => axiosMyPosts(),
    }),
    queryClient.prefetchQuery({
      queryKey: ['myscrapsCount'],
      queryFn: () => axiosMyScraps(),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
    </HydrationBoundary>
  );
}
