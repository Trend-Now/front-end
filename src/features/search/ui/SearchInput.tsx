import { cn } from '@/shared/lib';
import { Search } from '@/shared/ui';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearchClick: () => void;
  hasKeyword: boolean;
  /** 아이콘의 크기나 추가 스타일을 위한 클래스 */
  iconClassName?: string;
}

export const SearchInput = ({
  onSearchClick,
  hasKeyword,
  className,
  iconClassName,
  ...props
}: SearchInputProps) => {
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
};
