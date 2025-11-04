import  { useState } from 'react';
import { Outlet } from 'react-router-dom'; 
import Sidebar from './Sidebar.tsx';
import Header from './Header.tsx';
import Overlay from './Overlay.tsx';


function AppLayout() { 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      
      <Sidebar 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      
      <Overlay 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex flex-col flex-1 relative">
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;