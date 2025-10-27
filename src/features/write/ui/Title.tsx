import { Textarea } from '@/shared/ui';
import { useLayoutEffect, useRef } from 'react';

const MAX_LENGTH = 100;

interface TitleProps {
  value: string;
  onChange: (newValue: string) => void;
}

export default function Title({ value, onChange }: TitleProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    if (newValue.length > MAX_LENGTH) {
      onChange(newValue.slice(0, MAX_LENGTH));
      alert('제목은 최대 100자까지 입력할 수 있습니다.');
    } else {
      // 100자 이하일 때
      onChange(newValue); // 2. 정상적으로 값 업데이트
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  useLayoutEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="title" className="text-xs text-gray-800">
        제목
      </label>
      <Textarea
        ref={textareaRef}
        id="title"
        placeholder="제목을 입력해주세요"
        rows={1}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="scrollbar-none min-h-12 overflow-hidden px-4 py-[12.5px]"
        maxLength={MAX_LENGTH}
        value={value}
      />
    </div>
  );
}
