// 실시간 게시판 목록 검색
export interface SearchRealtimeBoardsResponse {
  message: string;
  searchResult: RealtimeBoard[];
}

export interface RealtimeBoard {
  boardId: number;
  boardName: string;
  createdAt: string;
  updatedAt: string;
}

// 실시간 게시판의 게시글 검색
export interface SearchRealtimePostsResponse {
  message: string;
  searchResult: SearchRealtimePostsResult;
}
export interface SearchRealtimePostsResult {
  totalPageCount: number;
  totalCount: number;
  realtimePostList: RealtimePost[];
}
export interface RealtimePost {
  postId: number;
  title: string;
  writer: string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  modifiable: boolean;
  createAt: string;
  updateAt: string;
  boardId: number;
  boardName: string;
}

// 고정 게시판의 게시글 검색
/** 게시판 이름 타입 */
export type FixedBoardName = '자유게시판' | '연예게시판' | '정치게시판';

export interface SearchFixedBoardsResponse {
  message: string;
  searchResult: {
    [key in FixedBoardName]: FixedBoardSearchResult;
  };
}

/** 게시판별 검색 결과 */
export interface FixedBoardSearchResult {
  message: string;
  totalPageCount: number;
  totalCount: number;
  postsListDto: FixedBoardPost[];
}

/** 게시글 타입 */
export interface FixedBoardPost {
  postId: number;
  title: string;
  writer: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  modifiable: boolean;
  createdAt: string;
  updatedAt: string;
}
