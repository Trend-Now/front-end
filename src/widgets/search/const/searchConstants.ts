export const SEARCH_TYPES: { label: string; pathname: string }[] = [
  { label: '실시간 인기 게시판', pathname: 'hotBoards' },
  { label: '실시간 인기 게시글', pathname: 'hotPosts' },
  { label: '고정 게시판', pathname: 'boards' },
] as const;

// 임시 주석처리
// { label: '전날 인기 게시판', pathname: 'prevHotBoards' },
// { label: '전날 인기 게시글', pathname: 'prevHotPosts' },

export const FIXED_SEARCH_TYPES = [
  { label: '자유게시판', pathname: 'free' },
  { label: '정치게시판', pathname: 'politics' },
  { label: '연예게시판', pathname: 'entertain' },
];
