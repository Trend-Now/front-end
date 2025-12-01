import { useAutoSearch } from '@/features/search/model/useAutoSearch';
import SearchInput from './SearchInput';
import SuggestionListMobile from './SuggestionListMobile';
import { Close, Modal, PrimaryButton } from '@/shared/ui';
import React from 'react';

interface SearchModalProps {
  /**@param {boolean} open 모달 여닫음 여부 */
  open: boolean;
  /**@param {() => void} onClose 모달을 닫을 시 실행하는 함수 */
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const { keyword, suggestions, handlers } = useAutoSearch();
  if (!open) return null;

  return (
    <Modal className="flex flex-col justify-start bg-white">
      <div className="flex w-full items-center gap-1.5 border-b border-gray-200 px-4 pb-4 pt-6">
        <SearchInput
          value={keyword}
          onChange={handlers.onChange}
          onKeyDown={(e) => {
            handlers.onKeyDown(e);
            if (e.key === 'Enter') {
              onClose();
            }
          }}
          onSearchClick={() => {
            handlers.onSubmit();
            onClose();
          }}
          hasKeyword={!!keyword}
          placeholder="원하는 검색어를 입력해주세요."
          className="h-10 flex-1 text-sm"
          iconClassName="w-5 h-5"
        />
        <PrimaryButton
          variant="gray"
          size="s"
          className="w-9 rounded-full border border-gray-200 p-0"
          onClick={onClose}
        >
          <Close className="h-5 w-5 text-gray-400" />
        </PrimaryButton>
      </div>

      <SuggestionListMobile suggestions={suggestions} keyword={keyword} onClose={onClose} />
    </Modal>
  );
}
