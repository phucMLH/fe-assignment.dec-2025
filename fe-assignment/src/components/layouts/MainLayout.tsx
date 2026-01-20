import type { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen flex-col bg-neutral-50">
      <Header />
      <div className="flex flex-1 overflow-hidden md:flex-row">
        {/* Sidebar - Responsive width */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main content area */}
        <main className="flex flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
