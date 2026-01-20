export default function Sidebar() {
  return (
    <aside className="w-full md:w-[260px] min-h-screen border-r border-neutral-200 bg-white px-3 py-2">
      {/* Messages Section */}
      <div className="mb-2">
        <h2 className="mb-1.5 pb-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500">
          Messages
        </h2>
        <div className="mb-2 border-b border-neutral-200"></div>
        <nav>
          <a
            href="/"
            className="flex items-center justify-between rounded-lg py-1.5 text-neutral-700 transition hover:bg-neutral-100"
          >
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                />
              </svg>
              <span className="text-sm font-medium">Inbox</span>
            </div>
            <span className="text-xs text-neutral-500">1 unread</span>
          </a>
        </nav>
      </div>

      {/* Discussions Section */}
      <div className="mb-2">
        <h2 className="mb-1.5 pb-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500">
          Discussions
        </h2>
        <div className="mb-2 border-b border-neutral-200"></div>
        <nav>
          <a
            href="#"
            className="flex items-center gap-2 rounded-lg py-1.5 text-neutral-700 transition hover:bg-neutral-100"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <span className="text-sm font-medium">Exercise 2</span>
          </a>
        </nav>
      </div>

      {/* Attachments Section */}
      <div>
        <h2 className="mb-1.5 pb-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500">
          Attachments
        </h2>
        <div className="mb-2 border-b border-neutral-200"></div>
        <nav>
          <a
            href="#"
            className="flex items-center gap-2 rounded-lg py-1.5 text-neutral-700 transition hover:bg-neutral-100"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
            <span className="text-sm font-medium">Exercise 3</span>
          </a>
        </nav>
      </div>
    </aside>
  );
}
