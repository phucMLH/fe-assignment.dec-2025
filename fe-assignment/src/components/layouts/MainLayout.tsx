import type { ReactNode } from 'react';

interface MainLayoutProps {
  sidebar: ReactNode;
  main: ReactNode;
  detail?: ReactNode;
}

export default function MainLayout({ sidebar, main, detail }: MainLayoutProps) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-neutral-50 md:flex-row">
      {/* Sidebar - Responsive width */}
      <div className="hidden md:block">{sidebar}</div>

      {/* Main content area */}
      <main className="flex flex-1 overflow-hidden">
        {/* Center panel*/}
        <div className="flex-1 overflow-y-auto border-r border-neutral-200 bg-white">
          {main}
        </div>
        {detail && (
          <div className="hidden w-full overflow-y-auto bg-white lg:block lg:w-96">
            {detail}
          </div>
        )}
      </main>
    </div>
  );
}
