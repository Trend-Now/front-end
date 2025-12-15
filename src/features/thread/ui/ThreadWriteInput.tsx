import { InputBoxPlusIcon, PrimaryButton } from '@/shared/ui';
import React from 'react';

interface ThreadWriteInputProps {
  boardId: number;
}

export default function ThreadWriteInput({ boardId }: ThreadWriteInputProps) {
  console.log(boardId);
  return (
    <div className="flex items-center gap-x-2 rounded-full border border-gray-200 px-3 py-2">
      <button className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 outline-none">
        <InputBoxPlusIcon />
      </button>
      <input
        type="text"
        className="flex-1 text-md text-gray-800 outline-none placeholder:text-gray-500"
        placeholder="스레드를 작성해주세요."
      />
      <PrimaryButton variant="gray" size="s">
        등록
      </PrimaryButton>
    </div>
  );
}
