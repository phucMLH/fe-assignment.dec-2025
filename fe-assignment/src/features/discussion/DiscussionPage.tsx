import CommentList from './components/CommentList';
import CommentEditor from './components/CommentEditor';
import { useDiscussion } from './hooks/useDiscussion';

export default function DiscussionPage() {
  const currentUser = {
    name: 'Login user',
    avatar: 'https://i.pravatar.cc/150?img=5',
  };

  const {
    comments,
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
      </div>
    </div>
  );
}
