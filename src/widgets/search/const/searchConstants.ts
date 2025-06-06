export const searchTypes: { label: string; pathname: string }[] = [
  { label: '실시간 인기 게시판', pathname: 'hotBoards' },
  { label: '실시간 인기 게시글', pathname: 'hotPosts' },
  { label: '전날 인기 게시판', pathname: 'prevHotBoards' },
  { label: '전날 인기 게시글', pathname: 'prevHotPosts' },
  { label: '고정 게시판', pathname: 'boards' },
  { label: '고정 게시글', pathname: 'posts' },
] as const;
