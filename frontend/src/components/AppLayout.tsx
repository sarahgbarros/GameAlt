import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.tsx";
import Overlay from "./Overlay.tsx";

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <Overlay
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex flex-col flex-1 relative">
        <main className="flex-1 p-0 overflow-y-auto">
          <Outlet context={{ setIsSidebarOpen }} />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
