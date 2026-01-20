import { useState, useEffect } from 'react';
import type { Comment } from '../types/discussion';
import { mockComments } from '../data/mockDiscussions';

export function useDiscussionState() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate API call to load comments
  useEffect(() => {
    const loadComments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setComments(mockComments);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load comments');
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
  }, []);

  const addComment = (content: string, author: { name: string; avatar?: string }) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: {
        id: `author-${Date.now()}`,
        name: author.name,
        avatar: author.avatar,
      },
      content,
      timestamp: new Date(),
      replies: [],
    };
    setComments((prev) => [newComment, ...prev]);
  };

  const updateComment = (commentId: string, content: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, content, timestamp: new Date() }
          : comment
      )
    );
  };

  const deleteComment = (commentId: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  };

  const addReply = (
    commentId: string,
    content: string,
    author: { name: string; avatar?: string }
  ) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          const newReply = {
            id: `reply-${Date.now()}`,
            author: {
              id: `author-${Date.now()}`,
              name: author.name,
              avatar: author.avatar,
            },
            content,
            timestamp: new Date(),
          };
          return {
            ...comment,
            replies: [...comment.replies, newReply],
          };
        }
        return comment;
      })
    );
  };

  const updateReply = (commentId: string, replyId: string, content: string) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === replyId
                ? { ...reply, content, timestamp: new Date() }
                : reply
            ),
          };
        }
        return comment;
      })
    );
  };

  const deleteReply = (commentId: string, replyId: string) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies.filter((reply) => reply.id !== replyId),
          };
        }
        return comment;
      })
    );
  };

  return {
    comments,
    isLoading,
    error,
    addComment,
    updateComment,
    deleteComment,
    addReply,
    updateReply,
    deleteReply,
  };
}
