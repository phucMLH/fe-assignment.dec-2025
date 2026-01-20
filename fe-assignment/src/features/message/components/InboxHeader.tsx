import { useState } from 'react';

interface InboxHeaderProps {
  totalMessages: number;
  currentRange: { start: number; end: number };
  onRefresh?: () => void;
  onCompose?: () => void;
}

export default function InboxHeader({ totalMessages, currentRange, onRefresh, onCompose }: InboxHeaderProps) {
  const [composeOpen, setComposeOpen] = useState(false);

  const handleComposeClick = () => {
    setComposeOpen(!composeOpen);
  };

  return (
    <div className="border-b border-neutral-200 bg-white px-6 py-2">
      <div className="flex items-center justify-between">
        {/* Left - Title */}
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold uppercase text-neutral-800">
            INBOX ({currentRange.start}-{currentRange.end}/{totalMessages})
          </h1>
          <button
            onClick={onRefresh}
            className="rounded p-0.5 text-neutral-600 transition hover:bg-neutral-100"
            aria-label="Refresh"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>

        {/* Right - Compose Button */}
        <div className="relative">
          <button
            onClick={handleComposeClick}
            className="flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-primary-700"
          >
            <span>Compose</span>
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {composeOpen && (
            <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg bg-white py-2 shadow-xl">
              <button
                onClick={() => {
                  setComposeOpen(false);
                  onCompose?.();
                }}
                className="flex w-full items-center justify-between px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
              >
                <span>Compose</span>
                <span className="text-xs text-neutral-500">(default)</span>
              </button>
              <div className="my-2 border-t border-neutral-200"></div>
              <div className="px-4 py-2 text-xs font-semibold uppercase text-neutral-500">Group by</div>
              <button className="block w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-100">
                Sender
              </button>
              <button className="block w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-100">
                Date
              </button>
              <button className="block w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-100">
                Recipients
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
