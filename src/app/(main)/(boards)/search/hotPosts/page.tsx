import { HotPosts } from '@/views/search';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;
  return <HotPosts keyword={keyword} />;
}
