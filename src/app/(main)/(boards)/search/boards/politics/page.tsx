import { FixedBoardSearch } from '@/features/search';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;
  return <FixedBoardSearch boardName="정치게시판" basePath="/politics" keyword={keyword} />;
}
