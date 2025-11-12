'use client';

import Title from './Title';
import StaticEditor from './StaticEditor';
import { RichTextEditorHandle } from '@/shared/types';
import { PrimaryButton } from '@/shared/ui';
import dynamic from 'next/dynamic';
import type { Delta } from 'quill';
import type { RefObject } from 'react';
import { useRouter } from 'next/navigation';

// Quill이 SSR 중 로딩되지 않도록 방지
const RichTextEditor = dynamic(() => import('@/features/write/ui/RichTextEditor'), {
  ssr: false,
  loading: () => <StaticEditor />,
});

interface WriteProps {
  /** 게시글 제목 */
  title: string;
  /** 제목이 변경될 때 호출되는 함수 */
  onTitleChange: (newTitle: string) => void;

  /** Quill 에디터의 콘텐츠 (Delta 형식) */
  content: Delta | null;
  /** 에디터 콘텐츠가 변경될 때 호출되는 함수 */
  onContentChange: (newContent: Delta) => void;

  /** 에디터 인스턴스(ref)를 통한 getContents, setContents 접근 (추후 옵셔널 삭제)*/
  editorRef: RefObject<RichTextEditorHandle | null>;
  /** 게시글 등록 또는 수정 버튼 클릭 시 호출되는 함수 (추후 옵셔널 삭제)*/
  onSubmit: () => void;
}

export default function Write({
  title,
  onTitleChange,
  content,
  onContentChange,
  editorRef,
  onSubmit,
}: WriteProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-y-4">
        {/* 제목 / 내용 */}
        <div className="flex flex-col gap-y-6 rounded-3xl bg-gray-100 p-6">
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-3">
              <Title value={title} onChange={onTitleChange} />
              <div className="flex flex-col gap-y-0.5 rounded-xl bg-[#EFF2F6] px-4 py-2.5">
                <span className="text-xs font-regular text-gray-500">
                  ※ 음란물, 차별, 비하, 혐오 및 초상권, 저작권 침해 게시물은 민, 형사상의 책임을 질
                  수 있습니다.
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="text-xs font-regular text-gray-800">내용</span>
              <div>
                <RichTextEditor ref={editorRef} value={content} onChange={onContentChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 버튼 */}
      <div className="flex justify-end gap-2">
        <PrimaryButton variant="gray" size="l" onClick={() => router.back()}>
          취소
        </PrimaryButton>
        <PrimaryButton variant="black" size="l" onClick={onSubmit}>
          등록
        </PrimaryButton>
      </div>
    </div>
  );
}
