import { useDiscussionState } from './useDiscussionState';
import { useCommentActions } from './useCommentActions';
import { useReplyActions } from './useReplyActions';
import type { Author } from '../types/discussion';

export function useDiscussion(currentUser: Author) {
  const {
    comments,
    isLoading,
    error,
    addComment,
    updateComment,
    deleteComment,
    addReply,
    updateReply,
    deleteReply,
  } = useDiscussionState();

  const commentActions = useCommentActions({
    onEdit: updateComment,
    onDelete: deleteComment,
  });

  const replyActions = useReplyActions({
    onAdd: (commentId, content) => addReply(commentId, content, currentUser),
    onEdit: updateReply,
    onDelete: deleteReply,
  });

  const handleAddComment = (content: string) => {
    addComment(content, currentUser);
  };

  return {
    // Data
    comments,
    currentUser,
    isLoading,
    error,

    // Comment
    handleEditComment: commentActions.handleStartEdit,
    handleDeleteComment: commentActions.handleDelete,
    editingCommentId: commentActions.editingCommentId,
    handleSaveEditComment: commentActions.handleSaveEdit,
    handleCancelEditComment: commentActions.handleCancelEdit,

    // Reply
    handleReplyToComment: replyActions.handleStartReply,
    handleSaveReply: replyActions.handleSaveReply,
    handleCancelReply: replyActions.handleCancelReply,
    replyingToCommentId: replyActions.replyingToCommentId,

    handleEditReply: replyActions.handleStartEditReply,
    handleSaveEditReply: replyActions.handleSaveEditReply,
    handleCancelEditReply: replyActions.handleCancelEditReply,
    handleDeleteReply: replyActions.handleDeleteReply,
    editingReplyId: replyActions.editingReplyId,

    handleAddComment,
  };
}
