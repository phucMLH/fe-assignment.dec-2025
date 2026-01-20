import { useState } from 'react';
import type { Message } from '../types/message';

interface MessageDetailProps {
  message: Message | null;
  onReply?: (message: Message) => void;
}

export default function MessageDetail({ message, onReply }: MessageDetailProps) {
  const [replyOpen, setReplyOpen] = useState(false);

  if (!message) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <p className="text-sm text-neutral-500">Select a message to view details</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header with Title and Reply */}
      <div className="border-b border-neutral-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-800">{message.subject}</h2>
          
          {/* Reply Dropdown */}
          <div className="relative">
            <button
              onClick={() => setReplyOpen(!replyOpen)}
              className="flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-primary-700"
            >
              <span>Reply</span>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {replyOpen && (
              <div className="absolute right-0 z-10 mt-2 w-36 rounded-lg bg-white py-1.5 shadow-xl">
                <button className="flex w-full items-center justify-between px-3 py-1.5 text-xs text-neutral-700 hover:bg-neutral-100">
                  <span>Reply all</span>
                  <span className="text-xs text-neutral-500">(default)</span>
                </button>
                <button
                  onClick={() => {
                    setReplyOpen(false);
                    onReply?.(message);
                  }}
                  className="block w-full px-3 py-1.5 text-left text-xs text-neutral-700 hover:bg-neutral-100"
                >
                  Reply
                </button>
                <button className="block w-full px-3 py-1.5 text-left text-xs text-neutral-700 hover:bg-neutral-100">
                  Archive
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Section - Height equals to 2 rows */}
      <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {/* From */}
          <div className="text-xs leading-relaxed">
            <span className="font-semibold text-neutral-900">From</span>{' '}
            <span className="text-neutral-700">{message.from.name}</span>
          </div>
          {/* To */}
          <div className="text-xs leading-relaxed">
            <span className="font-semibold text-neutral-900">To</span>{' '}
            <span className="text-neutral-700">{message.recipients.join(', ')}</span>
          </div>
          {/* Date */}
          <div className="text-xs leading-relaxed">
            <span className="font-semibold text-neutral-900">Date</span>{' '}
            <span className="text-neutral-700">{message.date}</span>
          </div>
          {/* Category */}
          {message.category && (
            <div className="text-xs leading-relaxed">
              <span className="font-semibold text-neutral-900">Category</span>{' '}
              <span className="inline-block rounded bg-primary-100 px-1.5 py-0.5 text-xs font-medium text-primary-700">
                {message.category}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap text-xs leading-relaxed text-neutral-700">{message.body}</div>
        </div>
      </div>

      {/* Related messages */}
      {message.relatedMessages && message.relatedMessages.length > 0 && (
        <div className="border-t border-neutral-200 p-3">
          <h3 className="mb-2 text-xs font-semibold text-neutral-800">Related Messages</h3>
          <div className="space-y-1.5">
            {message.relatedMessages.map((related) => (
              <div key={related.id} className="rounded border border-neutral-200 p-2">
                <div className="flex items-start justify-between">
                  <div className="text-xs text-neutral-500">{related.subject}</div>
                  <div className="text-xs text-neutral-500">{related.date}</div>
                </div>
                <div className="mt-0.5 text-xs text-neutral-600">{related.from}</div>
                <p className="mt-0.5 text-xs text-neutral-700">{related.preview}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
