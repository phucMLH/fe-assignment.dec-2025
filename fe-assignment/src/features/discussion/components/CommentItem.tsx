import { useState } from 'react';
import type { Comment } from '../types/discussion';
import ReplyList from './ReplyList';
import ReplyEditor from './ReplyEditor';

interface CommentItemProps {
  comment: Comment;
  currentUser: {
    name: string;
    avatar?: string;
  };
  onEdit?: (commentId: string) => void;
  onDelete?: (commentId: string) => void;
  onReply?: (commentId: string) => void;
  onEditReply?: (commentId: string, replyId: string) => void;
  onDeleteReply?: (commentId: string, replyId: string) => void;
  onSaveReply?: (commentId: string, content: string) => void;
}

export default function CommentItem({ comment, currentUser, onEdit, onDelete, onReply, onEditReply, onDeleteReply, onSaveReply }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(date));
  };

  return (
    <div className="relative mb-4">
      {/* Avatar line connector */}
      {comment.replies.length > 0 && (
        <div className="absolute left-[26px] top-[60px] h-[calc(100%-60px)] w-0.5 bg-neutral-400" />
      )}

      {/* Main comment card */}
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="relative z-10 h-[52px] w-[52px] flex-shrink-0">
          <img
            src={comment.author.avatar || 'https://i.pravatar.cc/150?img=1'}
            alt={comment.author.name}
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        {/* Comment content */}
        <div className="flex-1 rounded-lg bg-white p-4 shadow-sm">
          {/* Header */}
          <div className="mb-3 flex items-start justify-between">
            <h3 className="text-base font-semibold text-neutral-900">{comment.author.name}</h3>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <span>{formatTimestamp(comment.timestamp)}</span>
              <span>|</span>
              <button
                onClick={() => onEdit?.(comment.id)}
                className="text-primary-600 hover:text-primary-700"
              >
                Edit
              </button>
              <span>|</span>
              <button
                onClick={() => onDelete?.(comment.id)}
                className="text-red-600 hover:text-red-700"
              >
                🗑️
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="mb-3 whitespace-pre-wrap text-sm text-neutral-700">
            {comment.content}
          </div>

          {/* Reply button */}
          {!isReplying && (
            <button
              onClick={() => {
                setIsReplying(true);
                onReply?.(comment.id);
              }}
              className="text-sm font-medium text-primary-600 transition hover:text-primary-700"
            >
              Reply
            </button>
          )}
        </div>
      </div>

      {/* Replies */}
      <ReplyList
        replies={comment.replies}
        commentId={comment.id}
        currentUser={currentUser}
        onEditReply={onEditReply}
        onDeleteReply={onDeleteReply}
      />

      {/* Reply Editor */}
      {isReplying && (
        <div className="mt-3">
          <ReplyEditor
            currentUser={currentUser}
            commentId={comment.id}
            onSave={(commentId, content) => {
              onSaveReply?.(commentId, content);
              setIsReplying(false);
            }}
            onDismiss={() => setIsReplying(false)}
          />
        </div>
      )}
    </div>
  );
}
