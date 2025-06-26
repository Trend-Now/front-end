import { redirect } from 'next/navigation';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;
  redirect(`/search/boards/free?keyword=${keyword}`);
}
