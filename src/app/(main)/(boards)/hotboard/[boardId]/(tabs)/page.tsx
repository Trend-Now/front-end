import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ boardId: string }> }) {
  const { boardId } = await params;

  redirect(`/hotboard/${boardId}/thread`);
}
