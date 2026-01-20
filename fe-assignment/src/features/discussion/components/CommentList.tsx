import type { Comment } from '../types/discussion';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments: Comment[];
  currentUser: {
    name: string;
    avatar?: string;
  };
  onEditComment?: (commentId: string) => void;
  onDeleteComment?: (commentId: string) => void;
  onReplyToComment?: (commentId: string) => void;
  onEditReply?: (commentId: string, replyId: string) => void;
  onDeleteReply?: (commentId: string, replyId: string) => void;
  onSaveReply?: (commentId: string, content: string) => void;
}

export default function CommentList({
  comments,
  currentUser,
  onEditComment,
  onDeleteComment,
  onReplyToComment,
  onEditReply,
  onDeleteReply,
  onSaveReply,
}: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
          onEdit={onEditComment}
          onDelete={onDeleteComment}
          onReply={onReplyToComment}
          onEditReply={onEditReply}
          onDeleteReply={onDeleteReply}
          onSaveReply={onSaveReply}
        />
      ))}
    </div>
  );
}
