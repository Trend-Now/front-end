'use client';
import processDelta from '../lib/processDelta';
import Write from './Write';
import { axiosUploadPost } from '@/shared/api';
import { PostDetailResponse, RichTextEditorHandle } from '@/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Delta } from 'quill';
import { useRef, useState } from 'react';

interface PostWriteProps {
  /** 게시판 id */
  boardId: number;
  /** path */
  basePath: string;
}

const PostWrite = ({ boardId, basePath }: PostWriteProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const editorRef = useRef<RichTextEditorHandle>(null); // 에디터 내용(DOM)이나 메서드에 접근하기 위한 ref
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<Delta | null>(null);

  const handleSubmit = async () => {
    const uploadsByTempId = editorRef.current?.getUploadsByTempId();

    if (!title.trim() || !content) {
      alert('제목 또는 내용을 입력해주세요');
      return;
    }

    // 모든 이미지가 다 업로드 되었는지 확인
    const isAllUploaded = Object.values(uploadsByTempId!).every((item) => item.status === 'ok');

    if (!isAllUploaded) {
      alert('이미지를 업로드 중입니다. 잠시만 기다려주세요.');
      return;
    }

    const { newDelta, imageIds } = processDelta(content!, uploadsByTempId!);
    const response = await axiosUploadPost<PostDetailResponse>(
      boardId,
      title,
      JSON.stringify(newDelta),
      imageIds
    );
    queryClient.invalidateQueries({ queryKey: ['myposts'] });
    const posdId = response.data.postInfoDto.postId;
    router.push(`${basePath}/${boardId}/post/${posdId}`);
  };
  return (
    <Write
      title={title}
      onTitleChange={(newTitle: string) => setTitle(newTitle)}
      content={content}
      onContentChange={(newContent: Delta) => setContent(newContent)}
      editorRef={editorRef}
      onSubmit={handleSubmit}
    />
  );
};

export default PostWrite;
