interface AttachmentHeaderProps {
  onUploadClick: () => void;
  onRefresh?: () => void;
  selectedCount: number;
  actionsOpen: boolean;
  onActionsToggle: () => void;
}

export default function AttachmentHeader({ 
  onUploadClick, 
  onRefresh,
  selectedCount, 
  actionsOpen, 
  onActionsToggle 
}: AttachmentHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-white px-6 py-2 shadow-sm">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-neutral-800">ATTACHMENT</h1>
        <button
          onClick={onRefresh}
          className="rounded p-1 hover:bg-neutral-100"
          title="Refresh"
        >
          <svg className="h-5 w-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onUploadClick}
          className="flex items-center gap-2 rounded border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Upload
        </button>
        <div className="relative">
          <button
            onClick={onActionsToggle}
            className="flex items-center gap-2 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={selectedCount === 0}
          >
            Actions
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
          {actionsOpen && (
            <div className="absolute right-0 z-10 mt-2 w-56 rounded-lg border border-neutral-200 bg-white py-2 shadow-xl">
              <button
                className="block w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-100"
              >
                Download All
              </button>
              <div className="my-2 border-t border-neutral-200"></div>
              <div className="px-4 py-2 text-xs font-semibold uppercase text-neutral-500">
                SELECTION
              </div>
              <button
                className="block w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-100"
              >
                Move
              </button>
              <button
                className="block w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-100"
              >
                Copy
              </button>
              <button
                className="block w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-100"
              >
                Delete
              </button>
              <div className="my-2 border-t border-neutral-200"></div>
              <button
                className="block w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-100"
              >
                Activity History
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
