import { FixedBoardSearch } from '@/features/search';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;
  return <FixedBoardSearch boardName="연예게시판" basePath="/entertain" keyword={keyword} />;
}
