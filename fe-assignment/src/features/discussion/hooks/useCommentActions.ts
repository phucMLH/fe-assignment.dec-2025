import { useState } from 'react';

interface UseCommentActionsProps {
  onEdit: (commentId: string, content: string) => void;
  onDelete: (commentId: string) => void;
}

export function useCommentActions({ onEdit, onDelete }: UseCommentActionsProps) {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const handleStartEdit = (commentId: string) => {
    setEditingCommentId(commentId);
  };

  const handleSaveEdit = (commentId: string, content: string) => {
    onEdit(commentId, content);
    setEditingCommentId(null);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  const handleDelete = (commentId: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      onDelete(commentId);
    }
  };

  return {
    editingCommentId,
    handleStartEdit,
    handleSaveEdit,
    handleCancelEdit,
    handleDelete,
  };
}
