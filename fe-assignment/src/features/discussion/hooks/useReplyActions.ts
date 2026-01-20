import { useState } from 'react';

interface UseReplyActionsProps {
  onAdd: (commentId: string, content: string) => void;
  onEdit: (commentId: string, replyId: string, content: string) => void;
  onDelete: (commentId: string, replyId: string) => void;
}

export function useReplyActions({ onAdd, onEdit, onDelete }: UseReplyActionsProps) {
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);

  const handleStartReply = (commentId: string) => {
    setReplyingToCommentId(commentId);
  };

  const handleSaveReply = (commentId: string, content: string) => {
    onAdd(commentId, content);
    setReplyingToCommentId(null);
  };

  const handleCancelReply = () => {
    setReplyingToCommentId(null);
  };

  const handleStartEditReply = (_commentId: string, replyId: string) => {
    setEditingReplyId(replyId);
  };

  const handleSaveEditReply = (commentId: string, replyId: string, content: string) => {
    onEdit(commentId, replyId, content);
    setEditingReplyId(null);
  };

  const handleCancelEditReply = () => {
    setEditingReplyId(null);
  };

  const handleDeleteReply = (commentId: string, replyId: string) => {
    if (window.confirm('Are you sure you want to delete this reply?')) {
      onDelete(commentId, replyId);
    }
  };

  return {
    replyingToCommentId,
    editingReplyId,
    handleStartReply,
    handleSaveReply,
    handleCancelReply,
    handleStartEditReply,
    handleSaveEditReply,
    handleCancelEditReply,
    handleDeleteReply,
  };
}
