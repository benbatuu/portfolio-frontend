import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="md:h-[calc(100vh-64px)] lg:h-screen sm:h-[calc(100vh-100px)] p-4 md:p-8 bg-[#011627]">
      <div className="h-full rounded-2xl bg-[#010C15] overflow-hidden relative flex flex-col shadow-xl shadow-[#1E2D3D] border-4 border-[#1E2D3D]">
        <main className="relative h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};