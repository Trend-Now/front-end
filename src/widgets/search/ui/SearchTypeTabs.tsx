'use client';

import { PrimaryButton, SecondaryButton } from '@/shared/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface SearchTypeItem {
  label: string;
  pathname: string;
  totalCount?: number;
}

interface SearchTypeTabsProps {
  basePath: string;
  types: SearchTypeItem[];
  tabIndex: number;
}

export default function SearchTypeTabs({ basePath, types, tabIndex }: SearchTypeTabsProps) {
  const router = useRouter();
  const keyword = useSearchParams().get('keyword');
  const pathSegments = usePathname().split('/');
  const currentTab = pathSegments[tabIndex];

  return (
    <div className="flex gap-x-2">
      {types.map((item) => {
        const isActive = item.pathname === currentTab;

        return isActive ? (
          <PrimaryButton
            key={item.pathname}
            variant="black"
            size="s"
            className="text-nowrap rounded-full"
          >
            {item.label}
            {item.totalCount !== undefined && ` ${item.totalCount}건`}
          </PrimaryButton>
        ) : (
          <SecondaryButton
            key={item.pathname}
            variant="gray"
            size="s"
            className="text-nowrap rounded-full"
            onClick={() => router.push(`${basePath}/${item.pathname}?keyword=${keyword}`)}
          >
            {item.label}
            {item.totalCount !== undefined && ` ${item.totalCount}건`}
          </SecondaryButton>
        );
      })}
    </div>
  );
}
