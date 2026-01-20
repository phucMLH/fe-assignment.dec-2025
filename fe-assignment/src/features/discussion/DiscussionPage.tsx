import CommentList from './components/CommentList';
import CommentEditor from './components/CommentEditor';
import { useDiscussion } from './hooks/useDiscussion';
import { currentUser } from './data/mockUsers';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ErrorMessage from '../../components/common/ErrorMessage';

export default function DiscussionPage() {
  const {
    comments,
    isLoading,
    error,
    handleEditComment,
    handleDeleteComment,
    handleReplyToComment,
    handleEditReply,
    handleDeleteReply,
    handleSaveReply,
    handleAddComment,
  } = useDiscussion(currentUser);

  return (
    <div className="min-h-screen bg-neutral-300 p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-neutral-900">2. Discussion</h1>
        </div>

        {/* Loading State */}
        {isLoading && <LoadingSpinner size="lg" />}

        {/* Error State */}
        {error && !isLoading && (
          <ErrorMessage
            message={error}
            onRetry={() => window.location.reload()}
          />
        )}

        {/* Empty State */}
        {!isLoading && !error && comments.length === 0 && (
          <EmptyState
            title="No comments yet"
            description="Be the first to start a discussion!"
          />
        )}

        {/* Content */}
        {!isLoading && !error && comments.length > 0 && (
          <>
            {/* Comments */}
            <CommentList
              comments={comments}
              currentUser={currentUser}
              onEditComment={handleEditComment}
              onDeleteComment={handleDeleteComment}
              onReplyToComment={handleReplyToComment}
              onEditReply={handleEditReply}
              onDeleteReply={handleDeleteReply}
              onSaveReply={handleSaveReply}
            />

            {/* Add new comment editor */}
            <div className="mt-6">
              <CommentEditor
                currentUser={currentUser}
                placeholder="Add new comments"
                onSave={handleAddComment}
                onDismiss={() => {}}
              />
            </div>
          </>
        )}

        {/* Always show editor when not loading/error */}
        {!isLoading && !error && comments.length === 0 && (
          <div className="mt-6">
            <CommentEditor
              currentUser={currentUser}
              placeholder="Add new comments"
              onSave={handleAddComment}
              onDismiss={() => {}}
            />
          </div>
        )}
      </div>
    </div>
  );
}
