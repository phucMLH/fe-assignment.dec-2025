import { useState } from 'react';

interface CommentEditorProps {
  currentUser: {
    name: string;
    avatar?: string;
  };
  placeholder?: string;
  initialValue?: string;
  onSave: (content: string) => void;
  onDismiss: () => void;
}

export default function CommentEditor({
  currentUser,
  placeholder = 'Add new comments',
  initialValue = '',
  onSave,
  onDismiss,
}: CommentEditorProps) {
  const [content, setContent] = useState(initialValue);

  const handleSave = () => {
    if (content.trim()) {
      onSave(content);
      setContent('');
    }
  };

  const applyFormat = (format: string) => {
    // Simple formatting - in real app would use ContentEditable or rich text library
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let formattedText = selectedText;

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `__${selectedText}__`;
        break;
      case 'h1':
        formattedText = `# ${selectedText}`;
        break;
      case 'h2':
        formattedText = `## ${selectedText}`;
        break;
      case 'h3':
        formattedText = `### ${selectedText}`;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        break;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
  };

  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <div className="h-13 w-13 flex-shrink-0">
        <img
          src={currentUser.avatar || 'https://i.pravatar.cc/150?img=5'}
          alt={currentUser.name}
          className="h-full w-full rounded-full object-cover"
        />
      </div>

      {/* Editor content */}
      <div className="flex-1 rounded-lg bg-white p-4 shadow-sm">
        {/* Header */}
        <div className="mb-3 flex items-start justify-between">
          <h3 className="text-base font-semibold text-neutral-900">[{currentUser.name}]</h3>
          <div className="flex items-center gap-3 text-sm">
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

        {/* Toolbar */}
        <div className="mb-3 flex flex-wrap items-center gap-1 border-b border-neutral-200 pb-2">
          <button
            onClick={() => applyFormat('undo')}
            className="rounded p-1.5 text-neutral-600 transition hover:bg-neutral-100"
            title="Undo"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>
          <button
            onClick={() => applyFormat('redo')}
            className="rounded p-1.5 text-neutral-600 transition hover:bg-neutral-100"
            title="Redo"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
            </svg>
          </button>
          
          <div className="mx-1 h-6 w-px bg-neutral-300" />
          
          <button
            onClick={() => applyFormat('bold')}
            className="rounded p-1.5 font-bold text-neutral-700 transition hover:bg-neutral-100"
            title="Bold"
          >
            B
          </button>
          <button
            onClick={() => applyFormat('italic')}
            className="rounded p-1.5 italic text-neutral-700 transition hover:bg-neutral-100"
            title="Italic"
          >
            I
          </button>
          <button
            onClick={() => applyFormat('underline')}
            className="rounded p-1.5 text-neutral-700 underline transition hover:bg-neutral-100"
            title="Underline"
          >
            U
          </button>
          
          <div className="mx-1 h-6 w-px bg-neutral-300" />
          
          <button
            onClick={() => applyFormat('h1')}
            className="rounded px-2 py-1.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100"
            title="Heading 1"
          >
            H₁
          </button>
          <button
            onClick={() => applyFormat('h2')}
            className="rounded px-2 py-1.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100"
            title="Heading 2"
          >
            H₂
          </button>
          <button
            onClick={() => applyFormat('h3')}
            className="rounded px-2 py-1.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100"
            title="Heading 3"
          >
            H₃
          </button>
          
          <div className="mx-1 h-6 w-px bg-neutral-300" />
          
          <button
            onClick={() => applyFormat('ol')}
            className="rounded p-1.5 text-neutral-700 transition hover:bg-neutral-100"
            title="Ordered List"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6h9m-9 6h9m-9 6h9M4 6h.01M4 12h.01M4 18h.01" />
            </svg>
          </button>
          <button
            onClick={() => applyFormat('ul')}
            className="rounded p-1.5 text-neutral-700 transition hover:bg-neutral-100"
            title="Unordered List"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="mx-1 h-6 w-px bg-neutral-300" />
          
          <button
            onClick={() => applyFormat('link')}
            className="rounded p-1.5 text-neutral-700 transition hover:bg-neutral-100"
            title="Link"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </button>
          <button
            onClick={() => applyFormat('image')}
            className="rounded p-1.5 text-neutral-700 transition hover:bg-neutral-100"
            title="Image"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            onClick={() => applyFormat('code')}
            className="rounded p-1.5 text-neutral-700 transition hover:bg-neutral-100"
            title="Code"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </button>
        </div>

        {/* Editor textarea */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="min-h-32 w-full resize-none border-none text-sm text-neutral-700 placeholder-neutral-400 outline-none"
        />
      </div>
    </div>
  );
}
