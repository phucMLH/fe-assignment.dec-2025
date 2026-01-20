import type { Reply } from '../types/discussion';
import ReplyItem from './ReplyItem';

interface ReplyListProps {
  replies: Reply[];
  commentId: string;
  currentUser: {
    name: string;
    avatar?: string;
  };
  onEditReply?: (commentId: string, replyId: string) => void;
  onDeleteReply?: (commentId: string, replyId: string) => void;
}

export default function ReplyList({ replies, commentId, currentUser, onEditReply, onDeleteReply }: ReplyListProps) {
  if (replies.length === 0) return null;

  return (
    <div className="mt-4 space-y-3">
      {replies.map((reply) => (
        <ReplyItem
          key={reply.id}
          reply={reply}
          commentId={commentId}
          currentUser={currentUser}
          onEdit={onEditReply}
          onDelete={onDeleteReply}
        />
      ))}
    </div>
  );
}
