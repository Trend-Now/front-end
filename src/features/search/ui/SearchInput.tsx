import { cn } from '@/shared/lib';
import { Search } from '@/shared/ui';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**@param {() => void} onSearchClick 돋보기 아이콘을 클릭했을 때 실행되는 함수 */
  onSearchClick: () => void;

  /**@param {boolean} hasKeyword 검색어 입력 여부 (아이콘 활성화 색상 결정) */
  hasKeyword: boolean;

  /**@param {string} iconClassName 아이콘의 크기나 추가 스타일을 위한 클래스 */
  iconClassName?: string;
}

export default function SearchInput({
  onSearchClick,
  hasKeyword,
  className,
  iconClassName,
  ...props
}: SearchInputProps) {
  return (
    <div
      className={cn('flex items-center gap-2 rounded-full border bg-gray-100 px-5 py-3', className)}
    >
      <input type="search" className="flex-1 bg-transparent focus:outline-none" {...props} />
      <button onClick={onSearchClick}>
        <Search className={cn(hasKeyword ? 'text-gray-900' : 'text-gray-400', iconClassName)} />
      </button>
    </div>
  );
}
