import React, { useState } from 'react';
import Sidebar from './Sidebar.tsx';
import Header from './Header.tsx';
import Overlay from './Overlay.tsx';

// Props que o AppLayout espera receber
type AppLayoutProps = {
  children: React.ReactNode;
  setCurrentPage: (page: string) => void;
};

function AppLayout({ children, setCurrentPage }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      
      <Sidebar 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setCurrentPage={setCurrentPage}
      />
      
      <Overlay 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex flex-col flex-1 relative">
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;

