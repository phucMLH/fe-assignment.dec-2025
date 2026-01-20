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
    </aside>
  );
}
