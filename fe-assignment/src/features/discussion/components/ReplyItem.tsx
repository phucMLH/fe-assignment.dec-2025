import type { Reply, Author } from '../types/discussion';
import { formatRelativeTime } from '../../../utils/dateUtils';

interface ReplyItemProps {
  reply: Reply;
  commentId: string;
  currentUser: Author;
  onEdit?: (commentId: string, replyId: string) => void;
  onDelete?: (commentId: string, replyId: string) => void;
}

export default function ReplyItem({ reply, commentId, currentUser, onEdit, onDelete }: ReplyItemProps) {
  return (
    <div className="flex items-start gap-3">
      {/* Connector line spacer (where avatar would be) */}
      <div className="w-13 flex-shrink-0" />

      {/* Reply content */}
      <div className="flex flex-1 items-start gap-3">
        {/* Avatar */}
        <div className="flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">
          {reply.author.name.charAt(0).toUpperCase()}
        </div>

        {/* Username label outside */}
        <div className="w-20 flex-shrink-0 pt-3">
          <span className="text-sm font-semibold text-neutral-900">
            {reply.author.id === currentUser.id ? '[Login user]' : reply.author.name}
          </span>
        </div>

        {/* Reply bubble */}
        <div className="flex-1">
          <div className="rounded-lg bg-white p-3 shadow-sm">
            <p className="whitespace-pre-wrap text-sm text-neutral-700">{reply.content}</p>
          </div>
        </div>

        {/* Actions on the right */}
        <div className="flex flex-shrink-0 items-center gap-2 pt-3 text-sm text-neutral-600">
          <span>{formatRelativeTime(reply.timestamp)}</span>
          <span>|</span>
          <button
            onClick={() => onEdit?.(commentId, reply.id)}
            className="text-primary-600 hover:text-primary-700"
          >
            Edit
          </button>
          <span>|</span>
          <button
            onClick={() => onDelete?.(commentId, reply.id)}
            className="text-red-600 hover:text-red-700"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
