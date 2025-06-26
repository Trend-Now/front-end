import { HotBoards } from '@/views/search';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;
  return <HotBoards keyword={keyword} />;
}
