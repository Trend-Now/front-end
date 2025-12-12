import { HotBoardHeader, HotBoardTabs } from '@/widgets/hotboard';
import React from 'react';

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ boardId: string }>;
}>) {
  const { boardId } = await params;

  return (
    <div className="flex border-gray-200 bg-white md:border-r md:pr-8">
      <div className="flex w-full flex-col gap-y-4 md:gap-y-8">
        <HotBoardHeader boardId={Number(boardId)} />
        <HotBoardTabs boardId={Number(boardId)} />
        {children}
      </div>
    </div>
  );
}
