'use client';
import { axiosSearchFixedBoardPosts } from '@/shared/api';
import { useUserStore } from '@/shared/store';
import { FixedBoardName, SearchFixedBoardsResponse } from '@/shared/types';
import { FIXED_SEARCH_TYPES } from '@/widgets/search/const';
import SearchTypeTabs from '@/widgets/search/ui/SearchTypeTabs';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

const SearchFixedBoardHeader = () => {
  const { jwt } = useUserStore();
  const keyword = useSearchParams().get('keyword') as string;
  const { data: posts } = useQuery({
    queryKey: ['searchFixedBoardPosts', keyword, jwt],
    queryFn: () => axiosSearchFixedBoardPosts<SearchFixedBoardsResponse>(jwt!, keyword),
    select: (data) => data.searchResult,
    enabled: !!jwt,
  });

  if (!posts) return null;

  const searchTabsWithCount = FIXED_SEARCH_TYPES.map((type) => {
    const label = type.label as FixedBoardName;
    return {
      ...type,
      totalCount: posts[label].totalCount,
    };
  });

  return (
    <>
      <div className="text-2xl font-bold text-gray-800">고정 게시판</div>
      <SearchTypeTabs basePath={'/search/boards'} types={searchTabsWithCount} tabIndex={3} />
    </>
  );
};

export default SearchFixedBoardHeader;
