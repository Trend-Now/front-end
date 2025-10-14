import { Delete, Write } from '@/features/post/ui/icons';
import { axiosDeleteComment } from '@/shared/api';
import { InternalServerError } from '@/shared/error/error';
import { DropdownMenu, DropdownMenuItem, Kebab32 } from '@/shared/ui';
import { useQueryClient } from '@tanstack/react-query';

interface CommentKebabButtonProps {
  /**@param {number} boardId 게시판 아이디 */
  boardId: number;
  /**@param {number} postId 게시글 아이디 */
  postId: number;
  /**@param {number} commentId 댓글 아이디 */
  commentId: number;
  /**@param {() => void} onEditClick 수정 버튼 클릭 시 실행되는 함수 */
  onEditClick?: () => void;
}

export default function CommentKebabButton({
  boardId,
  commentId,
  postId,
  onEditClick,
}: CommentKebabButtonProps) {
  const queryClient = useQueryClient();

  const handleDeleteComment = async () => {
    const yn = confirm('정말 댓글을 삭제하시겠습니까?');

    if (yn) {
      const result = await axiosDeleteComment<boolean>(boardId, postId, commentId)
        .then(() => true)
        .catch(() => false);

      if (result) {
        queryClient.invalidateQueries({ queryKey: ['comments', boardId, postId] });
      } else {
        throw new InternalServerError('댓글 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  return (
    <DropdownMenu
      trigger={
        <span className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-200">
          <Kebab32 />
        </span>
      }
    >
      <DropdownMenuItem onClick={onEditClick}>
        <Write />
        댓글 수정
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleDeleteComment} className="text-negative">
        <Delete />
        댓글 삭제
      </DropdownMenuItem>
    </DropdownMenu>
  );
}
