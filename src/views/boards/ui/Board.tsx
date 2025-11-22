import { BoardHeader } from '@/widgets/boards';
import { BoardSection } from '@/features/board';

interface BoardProps {
  boardId: number;
}

export default function Board({ boardId }: BoardProps) {
  return (
    <div className="flex border-gray-200 bg-white md:border-r md:pr-8">
      <div className="flex w-full flex-col gap-y-6 py-3 md:gap-y-8 md:p-0">
        <BoardHeader boardId={boardId} />
        <BoardSection boardId={boardId} basePath={`/board`} />
      </div>
    </div>
  );
}
