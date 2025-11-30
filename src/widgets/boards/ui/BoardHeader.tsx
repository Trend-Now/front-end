import { BoardName } from '@/entities/board';
import { BoardWriteButton } from '@/features/board';
import { DateDivider } from '@/shared/ui';

interface BoardHeaderProps {
  boardId: number;
}

const BoardHeader = ({ boardId }: BoardHeaderProps) => {
  return (
    <div className="flex flex-col gap-y-4 md:gap-y-6">
      <DateDivider date={new Date()} background="black" />
      <div className="flex flex-col gap-y-1 md:gap-y-2">
        <div className="text-xs text-gray-500 md:text-md">
          이곳은 타이머 없는 이야기의 공간입니다. <br className="md:hidden" />
          누구나, 무엇이든 이야기 해보세요.
        </div>
        <div className="flex items-end justify-between">
          <BoardName boardId={boardId} className="text-2xl font-bold text-gray-800 md:text-3xl" />
          <BoardWriteButton href={`/board/${boardId}/write`} boardId={boardId} />
        </div>
      </div>
    </div>
  );
};

export default BoardHeader;
