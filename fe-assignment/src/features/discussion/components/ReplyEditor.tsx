import { useState } from 'react';

interface ReplyEditorProps {
  currentUser: {
    name: string;
    avatar?: string;
  };
  commentId: string;
  onSave: (commentId: string, content: string) => void;
  onDismiss: () => void;
}

export default function ReplyEditor({ currentUser, commentId, onSave, onDismiss }: ReplyEditorProps) {
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (content.trim()) {
      onSave(commentId, content);
      setContent('');
    }
  };

  return (
    <div className="flex items-start gap-3">
      {/* Connector line spacer (where avatar would be) */}
      <div className="w-13 flex-shrink-0" />

      {/* Reply content */}
      <div className="flex flex-1 items-start gap-3">
        {/* Username label outside */}
        <div className="w-20 flex-shrink-0 pt-3">
          <span className="text-sm font-semibold text-neutral-900">[{currentUser.name}]</span>
        </div>

        {/* Reply input bubble */}
        <div className="flex-1">
          <div className="rounded-lg bg-white p-3 shadow-sm">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Reply..."
              className="min-h-20 w-full resize-none border-none text-sm text-neutral-700 placeholder-neutral-400 outline-none"
            />
          </div>
        </div>

        {/* Actions on the right */}
        <div className="flex flex-shrink-0 items-center gap-3 pt-3 text-sm">
          <button
            onClick={onDismiss}
            className="text-neutral-600 transition hover:text-neutral-700"
          >
            Dismiss
          </button>
          <span className="text-neutral-400">|</span>
          <button
            onClick={handleSave}
            disabled={!content.trim()}
            className="font-medium text-primary-600 transition hover:text-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
