'use client';

import { useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import Quill, { Delta } from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill styles
import { axiosUploadImages } from '@/shared/api';
import type { ImageUploadResponse, ImageUploadState, RichTextEditorHandle } from '@/shared/types';
import '../lib/customImageBlot';
import { useMutation } from '@tanstack/react-query';

interface RichTextEditorProps {
  /** Quill 에디터의 콘텐츠 (Delta 형식) */
  value: Delta | null;
  /** 에디터 콘텐츠가 변경될 때 호출되는 함수 */
  onChange: (newContent: Delta) => void;
}

const MAX_LENGTH = 10000;

const RichTextEditor = forwardRef<RichTextEditorHandle, RichTextEditorProps>(
  ({ value, onChange }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null); // 에디터 컨테이너
    const quillRef = useRef<Quill | null>(null); // Quill 인스턴스

    const uploadsByTempIdRef = useRef<Record<string, ImageUploadState>>({});

    const { mutate } = useMutation({
      mutationFn: (formData: FormData) => axiosUploadImages<ImageUploadResponse>(formData),
    });

    const imageHandler = useCallback((editor: Quill) => {
      // 파일 입력창 생성
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.setAttribute('name', 'file');
      input.setAttribute('multiple', '');
      input.click();

      // 파일 선택 후 이벤트 처리
      input.onchange = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        const files = target.files;
        if (!files || files.length === 0) return;

        const tempIds: string[] = []; // 임시 id 저장할 배열
        const formData = new FormData(); // 제출할 폼 데이터

        // 파일 여러개일 경우 순회
        for (const file of files) {
          formData.append('images', file); // 폼 데이터의 추가
          const previewUrl = URL.createObjectURL(file);
          const tempId = `temp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
          tempIds.push(tempId);
          const range = editor.getSelection()!; // 현재 커서의 위치
          editor.insertEmbed(range.index, 'customImage', {
            url: previewUrl,
            tempId,
          });
          editor.setSelection(range.index + 1);
          uploadsByTempIdRef.current[tempId] = { status: 'pending' };
        }

        mutate(formData, {
          onSuccess: (data) => {
            data?.imageUploadDto.forEach((img, idx) => {
              uploadsByTempIdRef.current[tempIds[idx]] = {
                status: 'ok',
                url: img.imageUrl,
                id: img.id,
              };
            });
          },
          onError: () => {
            // 경고창 띄우기
            alert('이미지 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.');

            // 1) DOM에서 이미지 찾기
            const img = editor.root.querySelector(`img[data-temp-id="${tempIds[0]}"]`);
            if (!img) return;

            // 2) DOM -> Blot로 변환
            const found = Quill.find(img, true); // Blot | Quill | null
            if (!found || found instanceof Quill) return; // Blot만 통과

            // 3) 인덱스 얻기 & 커서 이동/교체
            const index = editor.getIndex(found);

            // 미리 보여준 이미 삭제하기
            editor.deleteText(index, tempIds.length);

            // uploadsRef 데이터 삭제하기
            for (const tempId of tempIds) {
              delete uploadsByTempIdRef.current[tempId];
            }
          },
        });
      };
    }, []);

    useEffect(() => {
      // 에디터 DOM이 아직 렌더링되지 않은 경우 실행하지 않음
      if (!editorRef.current) return;

      // Quill이 이미 초기화된 경우 중복 초기화를 방지
      if (quillRef.current) return;

      const quill = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: '내용을 입력하세요.',
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, false] }],
              [{ color: [] }, { background: [] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ align: [] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['image'],
            ],
            handlers: {
              image: () => {
                imageHandler(quill);
              },
            },
          },
        },
      });

      quillRef.current = quill;

      quill.on('text-change', (_, __, source) => {
        if (source === 'user') {
          // 현재 글자 수
          const currentLength = quill.getLength();

          // Quill은 항상 문서 끝에 보이지 않는 줄바꿈(\n)을 포함
          const maxLengthWithNewline = MAX_LENGTH + 1;

          // 글자 수가 제한을 초과했는지 확인
          if (currentLength > maxLengthWithNewline) {
            // 초과된 글자 수 계산
            const excessLength = currentLength - maxLengthWithNewline;

            // 에디터의 끝에서부터 초과된 만큼 텍스트 삭제
            quill.deleteText(MAX_LENGTH, excessLength);

            alert(`최대 ${MAX_LENGTH}자까지만 작성할 수 있습니다.`);
          }

          const newContent = quill.getContents();
          onChange(newContent);
        }
      });

      return () => {
        quillRef.current = null; // Cleanup to avoid memory leaks
      };
    }, [imageHandler]);

    // 부모 컴포넌트가 getContents 함수를 사용할 수 있도록 연결한다
    useImperativeHandle(ref, () => ({
      getUploadsByTempId: () => uploadsByTempIdRef.current,
    }));

    useEffect(() => {
      if (quillRef.current && value) {
        // 현재 내용과 새로운 value가 다를 때만 에디터 업데이트
        const isDifferent =
          JSON.stringify(quillRef.current.getContents()) !== JSON.stringify(value);

        if (isDifferent) {
          quillRef.current.setContents(value, 'api');
        }
      }
    }, [value]);

    return <div ref={editorRef} />;
  }
);

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
