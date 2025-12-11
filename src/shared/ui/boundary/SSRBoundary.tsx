import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';

interface SSRBoundaryProps {
  queryFns: Array<{ queryKey: string[]; queryFn: () => Promise<unknown> }>;
  children: React.ReactNode;
}

export default async function SSRBoundary({ queryFns, children }: SSRBoundaryProps) {
  const queryClient = new QueryClient();

  await Promise.all(
    queryFns.map((fn) =>
      queryClient.prefetchQuery({
        queryKey: fn.queryKey,
        queryFn: () => fn.queryFn(),
      })
    )
  );

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
