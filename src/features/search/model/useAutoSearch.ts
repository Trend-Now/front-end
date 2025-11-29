import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { axiosGetAutocomplete } from '@/shared/api';
import { AutoComplete } from '@/shared/types';

export const useAutoSearch = () => {
  const router = useRouter();

  const queryKeyword = useSearchParams().get('keyword');
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Debounce 설정
  const debouncedSearch = useCallback(
    debounce((value: string) => setDebouncedKeyword(value), 300),
    []
  );

  // 키워드 변경 감지
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    debouncedSearch(value);
    setIsOpen(true);
  };

  // API 호출
  const { data: suggestions = [] } = useQuery({
    queryKey: ['autoComplete', debouncedKeyword],
    queryFn: () => axiosGetAutocomplete<AutoComplete[]>(debouncedKeyword),
    enabled: !!debouncedKeyword.trim(),
  });

  // 검색 제출 (엔터 or 클릭)
  const onSubmit = () => {
    if (!keyword.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }

    // 현재 value와 쿼리스트링이 같으면 실행 X
    if (!keyword || keyword === queryKeyword) return;

    setIsOpen(false);
    router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSubmit();
  };

  // URL 변경 시 키워드 동기화
  useEffect(() => {
    setKeyword(queryKeyword || '');
    setDebouncedKeyword(queryKeyword || '');
  }, [queryKeyword]);

  return {
    keyword,
    suggestions,
    isOpen,
    handlers: { onChange, onKeyDown, onSubmit, setIsOpen },
  };
};
