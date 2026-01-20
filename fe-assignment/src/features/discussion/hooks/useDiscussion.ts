import { useDiscussionState } from './useDiscussionState';
import { useCommentActions } from './useCommentActions';
import { useReplyActions } from './useReplyActions';

interface CurrentUser {
  name: string;
  avatar?: string;
}

export function useDiscussion(currentUser: CurrentUser) {
  const {
    comments,
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

    // Comment actions
    handleEditComment: commentActions.handleStartEdit,
    handleDeleteComment: commentActions.handleDelete,
    editingCommentId: commentActions.editingCommentId,
    handleSaveEditComment: commentActions.handleSaveEdit,
    handleCancelEditComment: commentActions.handleCancelEdit,

    // Reply actions
    handleReplyToComment: replyActions.handleStartReply,
    handleSaveReply: replyActions.handleSaveReply,
    handleCancelReply: replyActions.handleCancelReply,
    replyingToCommentId: replyActions.replyingToCommentId,

    handleEditReply: replyActions.handleStartEditReply,
    handleSaveEditReply: replyActions.handleSaveEditReply,
    handleCancelEditReply: replyActions.handleCancelEditReply,
    handleDeleteReply: replyActions.handleDeleteReply,
    editingReplyId: replyActions.editingReplyId,

    // Add comment
    handleAddComment,
  };
}
